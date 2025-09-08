import { useState, useEffect } from "react";

export default function App() {
  const initialPosts = [
    {
      title: "Minimalist Design",
      desc: "Exploring the elegance of black & white in modern web design.",
      date: "Sep 8, 2025",
    },
    {
      title: "Typography Matters",
      desc: "How fonts and spacing can create visual harmony.",
      date: "Sep 7, 2025",
    },
    {
      title: "Responsive Layouts",
      desc: "Designs that look perfect on every device.",
      date: "Sep 6, 2025",
    },
    {
      title: "Subtle Interactions",
      desc: "Adding life with hover effects and micro-animations.",
      date: "Sep 5, 2025",
    },
  ];

  const initialProjects = [
    {
      title: "Portfolio Redesign",
      category: "Web Design",
      desc: "Transforming a cluttered portfolio into a sleek black & white experience.",
    },
    {
      title: "E-commerce UI",
      category: "UI/UX",
      desc: "Modern and clean product pages with subtle hover effects.",
    },
    {
      title: "Landing Page",
      category: "Web Design",
      desc: "Eye-catching one-page design with smooth scrolling interactions.",
    },
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      feedback: "This blog’s design is clean and easy to navigate. Love it!",
    },
    {
      name: "Mark Lee",
      feedback: "Minimalism at its best. Typography is excellent.",
    },
    {
      name: "Sophia Chen",
      feedback: "Responsive layouts make reading a pleasure on any device.",
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDesc, setNewPostDesc] = useState("");
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [projectFilter, setProjectFilter] = useState("All");

  // localStorage hook
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // filter
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) => projectFilter === "All" || p.category === projectFilter
  );

  // post
  const addPost = () => {
    if (!newPostTitle || !newPostDesc) return;
    setPosts([
      {
        title: newPostTitle,
        desc: newPostDesc,
        date: new Date().toLocaleDateString(),
      },
      ...posts,
    ]);
    setNewPostTitle("");
    setNewPostDesc("");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen flex flex-col items-center transition-colors duration-500`}
    >
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 border rounded hover:bg-gray-700 hover:text-white transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <header className="w-full py-24 px-6 text-center bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          Black & White Hub
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 mb-8">
          An interactive productivity & knowledge hub built with React &
          Tailwind.
        </p>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg w-full md:w-1/2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 mb-6 focus:outline-none"
        />
      </header>

      <section className="max-w-4xl w-full px-6 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Add Your Post</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="p-3 rounded-lg flex-1 bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={newPostDesc}
            onChange={(e) => setNewPostDesc(e.target.value)}
            className="p-3 rounded-lg flex-1 bg-gray-800 border border-gray-700 text-white"
          />
          <button
            onClick={addPost}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Add
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12 max-w-6xl w-full">
        {filteredPosts.length ? (
          filteredPosts.map((post, i) => (
            <div
              key={i}
              className="p-6 border border-gray-800 rounded-xl hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-gray-300">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4 text-sm">{post.date}</p>
              <p className="text-gray-200">{post.desc}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No posts found.
          </p>
        )}
      </section>

      <section className="max-w-6xl px-6 py-24 text-center bg-gray-900 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Projects</h2>
        <div className="flex justify-center gap-4 mb-6">
          {["All", "Web Design", "UI/UX"].map((category) => (
            <button
              key={category}
              onClick={() => setProjectFilter(category)}
              className={`px-4 py-2 border rounded ${
                projectFilter === category
                  ? "bg-white text-black"
                  : "text-gray-300 border-gray-600"
              } hover:bg-gray-700 hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredProjects.map((p, i) => (
            <div
              key={i}
              className="p-6 border border-gray-800 rounded-xl hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-300">{p.desc}</p>
              <p className="text-gray-400 italic mt-2">{p.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Testimonials</h2>
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 border border-gray-800 rounded-xl cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300"
              onClick={() =>
                setExpandedTestimonial(expandedTestimonial === i ? null : i)
              }
            >
              <p className="text-gray-300 mb-2 font-semibold">{t.name}</p>
              {expandedTestimonial === i && (
                <p className="text-gray-400 mt-2">{t.feedback}</p>
              )}
              {expandedTestimonial !== i && (
                <p className="text-gray-600 italic">Click to expand</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Statistics</h2>
        <div className="flex justify-center gap-10">
          <div>
            <p className="text-5xl font-bold text-gray-200">
              {projects.length}
            </p>
            <p className="text-gray-400">Projects</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-gray-200">{posts.length}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-gray-200">
              {testimonials.length}
            </p>
            <p className="text-gray-400">Testimonials</p>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 text-center border-t border-gray-800">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            LinkedIn
          </a>
        </div>
        <p className="text-gray-400 text-lg">© 2025 Black & White Hub</p>
      </footer>
    </div>
  );
}
