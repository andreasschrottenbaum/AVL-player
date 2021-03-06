module.exports = {
  mode: 'development',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?/i,
        use: 'ts-loader'
      },
      {
        test: /\.scss/i,
        exclude: [/\.styles.scss?/i],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styles.scss?/i,
        use: [
          'sass-to-string',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                output: 'compressed'
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  }
}