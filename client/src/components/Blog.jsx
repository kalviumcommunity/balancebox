import React, { useEffect, useState } from "react";

function Blog() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch("https://balancebox.onrender.com/get-blog");
        const bdata = await res.json();
        setBlog(bdata);

        if (bdata.status === 422 || bdata.status === 500) {
          alert(bdata.error);
          return bdata.error;
        }
      } catch (err) {
        console.log(err, ":this was error in blogdata");
      }
    };
    getBlogs();
    console.log(blog);
  }, [blog]);

  return (
    <div>
      {blog.map((e) => {
        return (
          <div>
            <h1>{e.blogTitle}</h1>
            <p>{e.blog}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Blog;
