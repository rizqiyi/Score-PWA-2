const getData = async (baseURL) => {
  try {
    const response = await fetch(`${baseURL}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": "9a3e1587dc574337a938a7989b4faace",
      },
    });

    const data = await response.json();
    document.getElementById("linear-progress").style.display = "block";
    return data;
  } catch (error) {
    return error;
  }
};

export { getData };
