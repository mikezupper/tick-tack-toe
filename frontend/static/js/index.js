import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import BlogNav from "./components/blog-nav.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  console.log("javig", url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: "blog-dashboard" },
    { path: "/posts", view: "blog-posts" },
    { path: "/posts/:id", view: "blog-post-view" },
    { path: "/settings", view: "blog-settings" },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  console.log("potentialMatches", potentialMatches);

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  console.log(" match", match, match.route, match.route.view);

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
    console.log("new match", match, match.route, match.result[0].result);
  }
  // console.log("thang,",document.createElement(match.route.view))
  document.querySelector("#app").childNodes.forEach((c) => {
    if (c instanceof HTMLElement) c.style.display = "none";
  });
  document.querySelector(match.route.view).style.display = "block";
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    console.log("click bbay ... calling router");

    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  console.log("loaded ... calling router");
  router();
});
