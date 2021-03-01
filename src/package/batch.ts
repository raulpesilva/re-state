function defaultNoopBatch(callback: any) {
  callback()
}

let batch = defaultNoopBatch

export const setBatch = (newBatch: any) => (batch = newBatch)

export const getBatch = () => batch
