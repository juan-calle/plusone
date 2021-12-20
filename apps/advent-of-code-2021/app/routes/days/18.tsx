import { ActionFunction, Form, json, useActionData } from 'remix'

type SFNumber = [number, number] | [number, SFNumber] | [SFNumber, SFNumber] | [SFNumber, number] | number

function reduce(input: SFNumber, depth = 0): SFNumber {
  console.log({ input, depth })
  if (depth === 3) {
    console.log('explode', input[0])
  }
  for (let i = 0; i < input.length; i++) {
    reduce(input[i], depth + 1)
  }
}

type ActionResponse = {
  part1: number
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const input = (formData.get('input') as string).split('\r\n').map((line) => JSON.parse(line))

  // console.log(input)
  reduce(input)

  return json({ part1: -1 } as ActionResponse)
}

export default function () {
  const result = useActionData<ActionResponse>()

  return (
    <Form method={'post'}>
      <label>
        <div>Input:</div>
        <textarea name={'input'} cols={30} rows={10} />
      </label>
      <br />
      <button>Solution!</button>
      {result ? <div>Solution (Part 1): {result.part1}</div> : null}
      {result ? <div>Solution (Part 2): TBD</div> : null}
    </Form>
  )
}
