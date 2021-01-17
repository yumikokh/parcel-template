export default querystring =>
  [...new URLSearchParams(querystring).entries()].reduce(
    (obj, e) => ({ ...obj, [e[0]]: e[1] }),
    {}
  )
