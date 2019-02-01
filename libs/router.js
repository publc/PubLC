const fs = require('fs');
const path = require('path');

/**
 * Validate if url match with the supported format
 *
 * @param {String} url
 * @throws Error if url does not match
 */
const validateUrl = url => {
  if (!/^\/api\//.test(url)) throw new Error();
};

/**
 * Get the path of a url who is the second path after /api/ required path
 *
 * @param {String} url
 * @returns {Object} Controller name
 */
const getControllerPath = req => {
  const controllerPath = makeControllerPath(getSplitUrl(parsePathUrl(req)));
  controllerExists(controllerPath);
  return controllerPath;
};

/**
 * Make controller path object
 *
 * @param {Array} splitUrl
 * @returns Object with path variables
 */
const makeControllerPath = splitUrl =>
  path.join(__dirname, '../controllers', splitUrl[0], `${splitUrl[1]}.js`);

/**
 * Replace (/api/) from the url to clean it
 *
 * @param {object} req
 * @returns {String} The path url
 */
const parsePathUrl = req => {
  const baseUrl = req.baseUrl + req.path;
  const pathUrl = baseUrl.replace(/^\/api\//, '');
  if (!pathUrl) throw new Error();
  return pathUrl;
};

/**
 * Split the url by / and return it
 *
 * @param {string} url
 * @returns {Array} The split url
 */
const getSplitUrl = url => {
  const splitUrl = url.split('/');
  if (splitUrl.length <= 1) throw new Error();
  return splitUrl;
};

/**
 * Validate if the provided route is a valid file
 *
 * @param {Object} controllerPath
 * @returns {Boolean} True if controller file exists False otherwise
 */
const controllerExists = controllerPath => {
  if (!fs.statSync(controllerPath).isFile()) throw new Error();
};

/**
 * Get method name for request call
 *
 * @param {Object} req
 */
const getMethod = req => (req && req.method ? req.method.toLowerCase() : null);

/**
 * Return request params
 *
 * @param {Object} req
 * @return {Object}
 */
const getParams = req => (getMethod(req) === 'get' ? req.query : req.body);

const makeCall = async req => {
  try {
    const controllerPath = getControllerPath(req);
    const controller = require(controllerPath);
    const method = getMethod(req);
    const params = getParams(req);
    return await controller[method](params);
  } catch (error) {
    throw error;
  }
};

module.exports = async (req, res, next) => {
  try {
    validateUrl(req.originalUrl);

    const data = await makeCall(req);
    return req.response.success(data);
  } catch (error) {
    return req.response.notFound();
  }
};
