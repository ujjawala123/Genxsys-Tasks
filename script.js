// GSAP Animations
gsap.from(".hero h2", { y: 50, opacity: 0, duration: 1 });
gsap.from(".feature-card", {
  scrollTrigger: ".features",
  y: 30,
  opacity: 0,
  stagger: 0.2,
});

// Debounce Function
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// GitHub API
const searchInput = document.getElementById("search");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function fetchUser(username) {
  loading.classList.remove("hidden");
  error.textContent = "";
  result.innerHTML = "";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();
    result.innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <h3>${data.name || data.login}</h3>
      <p>Repos: ${data.public_repos}</p>
    `;
  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.classList.add("hidden");
  }
}

searchInput.addEventListener(
  "input",
  debounce((e) => {
    if (e.target.value.trim()) {
      fetchUser(e.target.value);
    }
  }, 500)
);
