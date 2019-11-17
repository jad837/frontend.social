import httpClient from "./http-client";

const getQueryForNextPage = (currentQuery, totalPages) => {
  const paramsString = new URLSearchParams(currentQuery);
  const searchParams = new URLSearchParams(paramsString);
  const pageNo = searchParams.get("pageNo");
  let searchQuery;
  if (pageNo < totalPages) {
    searchParams.set("pageNo", pageNo + 1);
    searchQuery = searchParams.toString();
  }
  return searchQuery;
};

export default {
  getJobs: (searchText = "") => {
    const jobQuery = `job?searchText=${searchText}&skills=React&pageNo=1&itemsPerPage=20`;
    return httpClient.get(jobQuery);
  },
  getJobsOnSearchParamsChange: query => {
    const jobQuery = `job?${query}&pageNo=1&itemsPerPage=20`;
    return httpClient.get(jobQuery);
  },
  fetchDataForNextPage: (currentQuery, totalPages = 1) => {
    const query = getQueryForNextPage(currentQuery, totalPages);
    if (query) {
      const nextPageQuery = `job?${query}&itemsPerPage=20`;
      return httpClient.get(nextPageQuery);
    }
  },
  addJob: payload => {
    console.log("Payload is", payload);
    httpClient
      .post("job", payload)
      .then(response => {
        if (response.status === 200) {
          alert("job added successfully!");
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          alert("Error adding new job, Please fill all fields and try again.");
        }
      });
  }
};