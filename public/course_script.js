function load_class_list() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (!placeID) {
        window.location.href = "./learning_classes.html";
    } else {
        const father = document.getElementsByClassName("classes")[0];
        axios.get("http://localhost:3000/api/courses/" + placeID)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    res.data.reverse();
                    res.data.map((course, index) => {
                        var link = document.createElement("a");
                        link.href = `./course_page.html?place=${course._id}`;
                        link.classList.add("box");
                        const array = course.picture.split("\\");
                        const picture = array[3];
                        link.innerHTML = `
                        <div class="picture" style="background-image : url('../public/image/${picture}')"></div>
                        <h3>${course.name}</h3>
                        <div class="teacher">
                            <img src="../public/images/profile-icon.png" alt="profile-icon">
                            <p class="teacher_name">${course.teacher}</p>
                        </div>
                        <div class="detail">
                            <p class="time">${course.time}</p>
                            <p class="price">${course.price} تومان</p>
                        </div>`;
                        father.appendChild(link);
                    });
                } else {
                    father.innerHTML = `
                    <h3 id="no_class">در حال حاضر در این بخش کلاسی برگزار نمی شود</h3>
                    ` ;
                }
            }).catch(err => {
                console.log(err);
            });
    }
}
function load_course() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (!placeID) {
        window.location.href = "./learning_classes.html";
    } else {
        axios.get("http://localhost:3000/api/course_detail/" + placeID)
            .then(res => {
                document.getElementById("course_price").innerHTML = res.data.price + " تومان";
                document.getElementById("course_teacher_name").innerHTML = res.data.teacher;
                document.getElementById("course_time").innerHTML = res.data.time;
                document.getElementById("course_length").innerHTML = res.data.length + " جلسه";
                document.getElementById("course_hours").innerHTML = res.data.hours;
                document.getElementById("course_status").innerHTML = res.data.status;
                document.getElementById("course_start_date").innerHTML = res.data.start_date;
                document.getElementById("course_name").innerHTML = res.data.name;
                document.getElementById("course_info").innerHTML = res.data.info;
                document.getElementById("course_place").innerHTML = res.data.place;
                const array = res.data.picture.split("\\");
                const picture = array[3];
                document.getElementById("course_picture").style.backgroundImage = ` url('../public/image/${picture}')`
            }).catch(err => {
                console.log(err);
            });
    }
}
function enrolling_class(){

}