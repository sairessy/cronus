async function wakeupAPI() {
  console.log('..')
  let num_fails = 0;

  while (!api_on && num_fails < 10) {
    try {
      console.log("Waking up the API...");
      const res = await fetch(api_url);
      if (res.status === 200) {
        api_on = true;

        if (api_on && localStorage.getItem('user')) {
          document.getElementById("loader").style.display = "none";
          console.log("Done waking up the API.");
        }
      }
    } catch (error) {
      console.log(error);
      num_fails++;
    }
  }

  if (num_fails >= 10) {
    alert("Erro no servidor.");
  }
}

let api_on = false;

wakeupAPI();
