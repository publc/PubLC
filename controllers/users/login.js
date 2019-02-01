exports.get = params => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({ response: params });
    }, 2000);
  });
};

exports.post = params => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({ response: params });
    }, 500);
  });
};

exports.put = params => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({ response: params });
    }, 500);
  });
};

exports.delete = params => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log('enter here');
      resolve({ response: params });
    }, 500);
  });
};
