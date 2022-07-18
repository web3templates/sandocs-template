module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["cdn.sanity.io"]
  },
  async redirects() {
    return [
      // delete this object if you have a landing page
      // and you do not want the home / index page to be redirected
      {
        source: "/",
        destination: "/docs/intro",
        permanent: true
      },
      // navigate /docs to the intro page.
      {
        source: "/docs",
        destination: "/docs/intro",
        permanent: true
      }
    ];
  }
};
