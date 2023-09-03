const moduleHelper = (function () {
  function parseQueryString(query) {
    const vars = query.split("&");
    const query_string = {};
    for (const element of vars) {
      const pair = element.split("=");
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        let arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

  function getQueryParams() {
    let url = window.location;
    // let paramsString = url.pathname;
    let paramsString = url.href;
    // let params = paramsString.split('/');
    let result = {
      category: '',
      slug: '',
    };
    // let paramsLenght = params.length;
    // if (paramsLenght > 1) {
    //   result.category = params[1];
    // }
    // if (paramsLenght > 2) {
    //   result.slug = params[2];
    // }
    const params = new URLSearchParams(paramsString.slice(paramsString.indexOf('?') + 1));
    result.category = params.get('category');
    result.slug = params.get('title');
    return result;
  }

  function isEmpty(param) {
    return (
      !param || 0 === param.length || param.trim().length === 0
    );
  }

  function compareDateDesc(a, b) {
    const nameA = a.createdAt.toLowerCase();
    const nameB = b.createdAt.toLowerCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = -1;
    } else if (nameA < nameB) {
      comparison = 1;
    }
    return comparison;
  }

  return {
    parseQueryString,
    getQueryParams,
    isEmpty,
    compareDateDesc,
  };
})();
