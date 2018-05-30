/**
 * @return number
 * @param {String} content
 * @function permutates and gets the reading time for a particular post
 */
export const permutateReadingTime = _content => {
  let content = _content.replace(/<[^>]*>/gi, ""),
    readTime = Math.floor(parseInt(content.trim().length) / 150);
  return readTime === 0 ? 1 : readTime;
};

export const getSchemaType = category => {
  let _schemaType = undefined;
  switch (category.toLowerCase()) {
    case "education":
      _schemaType = "Education";
      break;
    case "informations":
      _schemaType = "Information";
      break;
    case "opportunities":
      _schemaType = "Opportunities";
      break;
    default:
      _schemaType = "CurrentPrices";
  }
  return _schemaType;
};
