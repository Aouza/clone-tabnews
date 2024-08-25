import retry from "async-retry";

const waitForAllServices = async () => {
  const waitForWebServices = async () => {
    const fetchStatusPage = async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      response.json();
    };

    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  };

  await waitForWebServices();
};

export default {
  waitForAllServices,
};
