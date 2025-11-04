declare module 'node-unihan-etl' {
  export default function (
    info: {destination: string}
  ): Promise<void>
}
