'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const axios = require("axios");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const ratingElement = dom.window.document.querySelector(".age-restrictions__icon use");
  const rating = ratingElement ? ratingElement.getAttribute("xlink:href")
  .replace(/_/g, "")
  .replace(/[^\w-]+/g, "") : "Free";

  const description = dom.window.document.querySelector(".description");

  return {
    rating,
    short_description: description.textContent.trim().slice(0, 160),
    description: description.innerHTML,
  }


}

module.exports = {
  populate: async (params) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`

    const { data: { products } } = await axios.get(gogApiUrl)

    // console.log(products[2].slug);

   console.log(await getGameInfo(products[2].slug));
  }
};
