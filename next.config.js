module.exports = {
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/B6saB5z',
        permanent: true,
      },
    ]
  },
}