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
        axios.get("http://localhost:3000/api/course_detail/" + placeID, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const token = localStorage.getItem("token");
            if (!token) {
                document.getElementById("enrolling_button").innerHTML = "برای ثبت نام در کلاس وارد شوید";
                document.getElementById("enrolling_button").onclick = () => {
                    window.location.href = "../register.html";
                }
            }
            if (res.data.history == "false") {
                document.getElementById("enrolling_button").innerHTML = "رفتن به کلاس";
                document.getElementById("enrolling_button").onclick = () => {
                    window.location.href = "../profileView/my_courses.html";
                }
            }
            document.getElementById("course_price").innerHTML = res.data.course.price + " تومان";
            document.getElementById("course_teacher_name").innerHTML = res.data.course.teacher;
            document.getElementById("course_time").innerHTML = res.data.course.time;
            document.getElementById("course_length").innerHTML = res.data.course.length + " جلسه";
            document.getElementById("course_hours").innerHTML = res.data.course.hours;
            //------ translate section
            let status;
            switch (res.data.course.status) {
                case "ongoing":
                    status = "درحال برگزاری";
                    break;
                case "waiting":
                    status = "به زودی";
                    break;
                case "done":
                    status = "تمام شده";
                    break;
            }
            //------
            document.getElementById("course_status").innerHTML = status;
            document.getElementById("course_start_date").innerHTML = res.data.course.start_date;
            document.getElementById("course_name").innerHTML = res.data.course.name;
            document.getElementById("course_info").innerHTML = res.data.course.info;
            document.getElementById("course_place").innerHTML = res.data.course.place;
            const array = res.data.course.picture.split("\\");
            const picture = array[3];
            document.getElementById("course_picture").style.backgroundImage = ` url('../public/image/${picture}')`
        }).catch(err => {
            console.log(err);
        });
    }
}
function enrolling_class() {
    const placeID = new URLSearchParams(window.location.search).get("place");
    if (!placeID) {
        window.location.href = "./learning_classes.html";
    } else {
        axios.get("http://localhost:3000/api/courses/enrolling_class/" + placeID, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            window.location.assign(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
}