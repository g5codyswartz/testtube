
// Run at /g5_ops/config with json parser extension

json.locations.map((loc) => {
  return {
    location: loc.location,
    pages: loc.page_configs.map((page) => {
      return {
        page: page.page,
        page_slug: page.page_slug
      }
    })
  }
});