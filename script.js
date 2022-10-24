function loader() {
    setTimeout(() => {document.querySelector("#h1time").style.opacity = 1;}, 1300)

}

window.addEventListener("resize", () => {
    var about = document.querySelector("#aboutEl").getBoundingClientRect()
    var studio = document.querySelector("#aboutEl").getBoundingClientRect()
    console.log(`${window.innerWidth}, ${window.innerHeight}`);
    // if (about.left < 1200)
    console.log(`studio is ${studio.left}left ${studio.right}right, about is ${about.left}left ${about.right}right`);
})
