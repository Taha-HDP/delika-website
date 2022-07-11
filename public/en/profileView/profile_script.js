function load_profile_data() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
    } else {
        axios.get(domain + "/api/profile/detail", {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const Data = {
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                username: res.data.username,
                email: res.data.email,
                gender: res.data.gender,
                phone: res.data.phone,
                address: res.data.address,
                birth: res.data.birth,
            }

            if (Data.first_name)
                document.forms["member-detail"]["first-name"].value = res.data.first_name;
            if (Data.last_name)
                document.forms["member-detail"]["last-name"].value = res.data.last_name;
            if (Data.username) {
                document.getElementById("username").innerHTML = res.data.username;
                document.forms["member-detail"]["username"].value = res.data.username;
            }
            if (Data.email)
                document.forms["member-detail"]["email"].value = res.data.email;
            if (Data.gender)
                document.forms["member-detail"]["gender"].value = res.data.gender;
            if (Data.phone)
                document.forms["member-detail"]["phone"].value = res.data.phone;
            if (Data.address)
                document.forms["member-detail"]["address"].innerHTML = res.data.address;
            if (Data.birth)
                document.forms["member-detail"]["birth"].value = res.data.birth;
        }).catch(err => {
            window.location.assign("/");
        });
    }

}
function edit_profile() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
    } else {
        const info = {
            first_name: document.forms["member-detail"]["first-name"].value,
            last_name: document.forms["member-detail"]["last-name"].value,
            username: document.forms["member-detail"]["username"].value,
            email: document.forms["member-detail"]["email"].value,
            gender: document.forms["member-detail"]["gender"].value,
            phone: document.forms["member-detail"]["phone"].value,
            address: document.getElementById("address").value,
            birth: document.forms["member-detail"]["birth"].value,
        }
        if (!info.username || !info.email || !info.phone) {
            const text = "username , Email & Phone number is required";
            call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
            load_profile_data();
        }
        axios.put(domain + "/api/profile/edit", info, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        })
            .then(res => {
                load_profile_data();
                const text = "Successfully saved";
                call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");

            }).catch(err => {
                load_profile_data();
                const text = "Username / Phone number / email is duplicate ";
                call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
            });
    }

}
function exit_req() {
    if (confirm("Do you want to log out of your account?")) {
        localStorage.removeItem("token");
        localStorage.removeItem('basket');
        window.location.assign("/");
    }
}
function check_role() {
    const id = localStorage.getItem("token");
    if (!id) {
        window.location.assign("/");
    } else if (window.innerWidth >= 1024) {
        axios.get(domain + "/api/profile/detail", {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            const role = res.data.role;
            if (role == "admin") {
                const revers = document.getElementById("admin_option");
                revers.style.display = "block";
            } else {
                const revers = document.getElementById("admin_option");
                revers.style.display = "none";
            }
        }).catch(err => {
            const revers = document.getElementById("admin_option");
            revers.style.display = "none";
        });
    }
}
function change_password() {
    let current = document.getElementById("current-password").value;
    let new_password = document.getElementById("new-password").value;
    let check_password = document.getElementById("check-password").value;
    if (!new_password || !current || !check_password) {
        const text = "You have to fill in all the options";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else if (new_password != check_password) {
        const text = "The passwords entered are not the same";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else if (new_password.length < 6) {
        const text = "The password must be at least 6 characters long";
        call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
    } else {
        axios.put(domain + "/api/profile/changePassword", { new_password, current }, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data == "not found") {
                const text = "The password entered is incorrect";
                call_cs_popup(text, 4000, "#5D101D", "#ffd5da", "#390b1b");
            } else {
                const text = "Successfully saved";
                call_cs_popup(text, 4000, "#277539", "#DAFFE6", "#20A740");
                document.getElementById("current-password").value = "";
                document.getElementById("new-password").value = "";
                document.getElementById("check-password").value = "";
            }
        }).catch(err => {
            window.location.assign("/500.html");
        });
    }
}
function member_help_requests() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
    const father = document.querySelector("tbody");
    axios.get(domain + "/api/profile/help_request_list", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((item, index) => {
                let money_color = "rgb(245 93 93 / 92%)";
                let status_color = "rgb(255 152 92 / 92%)";
                if (item.money_status == "پرداخت شده") {
                    money_color = "rgb(79 255 85 / 92%)";
                }
                if (item.status == "انجام شده") {
                    status_color = "rgb(79 255 85 / 92%)";
                }
                var tr = document.createElement("tr");
                if(window.innerWidth > 480){
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.create_date}</td>
                    <td>${item.final_date}</td>
                    <td style="background : ${status_color}">${item.status}</td>
                    <td style="background : ${money_color}">${item.money_status}</td>
                    <td><button class="detail_button" onclick="help_request_dateil('${item._id}')">detail</button></td>`;
                }else{
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.final_date}</td>
                    <td style="background : ${status_color}">${item.status}</td>
                    <td style="background : ${money_color}">${item.money_status}</td>
                    <td><button class="detail_button" onclick="help_request_dateil('${item._id}')">detail</button></td>`;
                }
                
                father.appendChild(tr);
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">You have not submitted any requests</h4>
            `;
        }

    }).catch(err => {
        window.location.assign("/");
    });
}
function help_request_dateil(id) {
    document.getElementById("self-req").style.display = "none";
    document.getElementById("requestDetail").style.display = "block";
    axios.get(domain + "/api/profile/helpDetail/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const request = res.data;
        let type;
        if (request.type == "see")
            type = "Presence";
        else
            type = "Telephone" ;
        document.getElementById("requestDetail").innerHTML = `
        <h3 id="detail-head">Consulting detail</h3>
        <h3 id="back-button" onclick="backToRequests()">Back</h3>
        <table>
            <tbody>
                <tr>
                    <td>request ID</td>
                    <td>${request._id}</td>
                </tr>
                <tr>
                    <td>First & Last name</td>
                    <td>${request.name}</td>
                </tr>
                <tr>
                    <td>Phone number entered</td>
                    <td>${request.phone}</td>
                </tr>
                <tr>
                    <td>date of request</td>
                    <td>${request.create_date}</td>
                </tr>
                <tr>
                    <td>Specified date</td>
                    <td>${request.final_date}</td>
                </tr>
                <tr>
                    <td>Type of Consulting</td>
                    <td>${type}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${request.status}</td>
                </tr>
                <tr>
                    <td>Payment status</td>
                    <td>${request.money_status}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>${request.info}</td>
                </tr>
            </tbody>
        </table> ` ;
    }).catch(err => {
         window.location.assign("/500.html");
    });
}
function member_self_requests() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
    const father = document.querySelector("tbody");
    axios.get(domain + "/api/profile/self_request_list", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((request, index) => {
                let status_color;
                switch (request.status) {
                    case "checking":
                        status_color = "rgb(255 182 108 / 92%)";
                        break;
                    case "creating":
                        status_color = "rgb(233 243 86 / 92%)";
                        break;
                    case "sended":
                        status_color = "rgb(102 207 247 / 92%)";
                        break;
                    case "done":
                        status_color = "rgb(79 255 85 / 92%)";
                        break;
                }
                var tr = document.createElement("tr");
                if (index % 2 == 0) {
                    tr.style.backgroundColor = "rgb(200,200,200)";
                } else {
                    tr.style.backgroundColor = "rgb(241, 241, 241)";
                }
                if (window, innerWidth > 480) {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${request.name}</td>
                    <td>${request.type}</td>
                    <td>
                        width = ${request.x} | height = ${request.y}
                    </td>
                    <td style="background : ${status_color}">${request.status}</td>
                    <td>${request.send_date}</td>
                    <td><button class="detail_button" onclick="self_request_dateil('${request._id}')">detail</button></td>`;
                } else {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${request.name}</td>
                    <td>${request.type}</td>
                    <td style="background : ${status_color}">${request.status}</td>
                    <td>${request.send_date}</td>
                    <td><button class="detail_button" onclick="self_request_dateil('${request._id}')">detail</button></td>`;
                }
                father.appendChild(tr);
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">You did not submit any personal details</h4>
            `;
        }
    }).catch(err => {
        window.location.assign("/500.html");
    });
}
function self_request_dateil(id) {
    document.getElementById("self-req").style.display = "none";
    document.getElementById("requestDetail").style.display = "block";
    axios.get(domain + "/api/profile/requestDetail/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        const request = res.data;
        const array = request.picture.split("/");
        const picture = array[3];
        document.getElementById("requestDetail").innerHTML = `
        <h3 id="detail-head">request detail</h3>
        <h3 id="back-button" onclick="backToRequests()">Back</h3>
        <table>
            <tbody>
                <tr>
                    <td>request ID</td>
                    <td>${request._id}</td>
                </tr>
                <tr>
                    <td>first & last name</td>
                    <td>${request.name}</td>
                </tr>
                <tr>
                    <td>Phone number</td>
                    <td>${request.phone}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${request.email}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>${request.type}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${request.status}</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>${request.x}</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>${request.y}</td>
                </tr>
                <tr>
                    <td>sended date</td>
                    <td>${request.send_date}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>${request.info}</td>
                </tr>
                <tr>
                    <td>Picture</td>
                    <td>
                        <img src="../public/image/${picture}">
                    </td>
                </tr>
            </tbody>
        </table> ` ;
    }).catch(err => {
        window.location.assign("/500.html");
    });
}
function backToRequests() {
    document.getElementById("self-req").style.display = "block";
    document.getElementById("requestDetail").style.display = "none";
}
function load_oreder() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
    const father = document.querySelector("tbody");
    axios.get(domain + "/api/profile/orders", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((item, index) => {
                let status_color = "rgb(255 152 92 / 92%)";
                if (item.status == "انجام شده") {
                    status_color = "rgb(79 255 85 / 92%)";
                }
                var tr = document.createElement("tr");
                if (window.innerWidth > 750) {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.refID}</td>
                    <td>${item.buyer_name}</td>
                    <td>${item.total_price} $</td>
                    <td>${item.date}</td>
                    <td style="background : ${status_color}">${item.status}</td>
                    <td><button id="detail_button" onclick="order_detail('${item._id}')">detail</button></td>`
                } else if (window.innerWidth > 480) {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.refID}</td>
                    <td>${item.total_price} $</td>
                    <td>${item.date}</td>
                    <td style="background : ${status_color}">${item.status}</td>
                    <td><button id="detail_button" onclick="order_detail('${item._id}')">detail</button></td>`
                } else {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.refID}</td>
                    <td>${item.total_price} $</td>
                    <td style="background : ${status_color}">${item.status}</td>
                    <td><button id="detail_button" onclick="order_detail('${item._id}')">detail</button></td>`
                }
                father.appendChild(tr);
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">You have not registered any orders</h4>
            `;
        }

    }).catch(err => {
        window.location.assign("/");
    });
}
function order_detail(id) {
    document.getElementsByTagName("table")[0].style.display = "none";
    document.getElementById("orderList_header").style.display = "none";
    document.getElementById("orderPage").style.display = "block";
    axios.get(domain + "/api/profile/orders/" + id, {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        document.getElementById("F&Lname").innerHTML = res.data.name;
        document.getElementById("send_address").innerHTML = res.data.address;
        document.getElementById("post_code").innerHTML = res.data.post_code;
        document.getElementById("send_money").innerHTML = res.data.shipping_cost + " $";
        document.getElementById("offer").innerHTML = res.data.offer + " $";
        document.getElementById("final_total").innerHTML = res.data.total_price + " $";
        document.getElementById("refID").innerHTML = res.data.refID;
        document.getElementById("date").innerHTML = res.data.date;
        document.getElementById("status").innerHTML = res.data.status;
        document.getElementById("items_total").innerHTML = (res.data.total_price - res.data.shipping_cost - res.data.offer) + " $";
        document.getElementById("object_info").innerHTML = `
        <h3>Ordered products</h3>  
        ` ;
        res.data.items.map((item) => {
            const item_box = document.createElement("div");
            item_box.classList.add("object_box");
            const array = item.picture.split("/");
            const picture = array[3];
            item_box.innerHTML = `
                    <div class="basket_object_info">
                        <div class="object_picture" style="background-image : url('../public/image/${picture}')"></div>
                        <div class="objectDetail">
                            <h4 class="object_name">${item.name}</h4>
                            <h4 class="object_type">دسته بندی : ${item.type}</h4>
                            <h4 class="object_class">سبک : ${res.data.class}</h4>
                            <h4 class="object_shapes">ابعاد : ${item.x}x${item.y}</h4>
                        </div>
                    </div>
                    <h4 class="object_price">${item.price} $</h4>
                    ` ;
            document.getElementById("object_info").appendChild(item_box);
        })
    }).catch(err => {
        window.location.assign("/500.html")
    });
}
function backToOrders() {
    document.getElementsByTagName("table")[0].style.display = "table";
    document.getElementById("orderPage").style.display = "none";
    document.getElementById("orderList_header").style.display = "block";
}
function load_my_course() {
    const auth = localStorage.getItem("token");
    if (!auth)
        return window.location.assign("/");
    axios.get(domain + "/api/profile/my_course", {
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data.length > 0) {
            res.data.reverse();
            res.data.map((course, index) => {
                var tr = document.createElement("tr");
                tr.style.backgroundColor = "rgb(220,220,220)";
                if (window.innerWidth > 750) {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.length}</td>
                    <td>${course.time}</td>
                    <td>${course.status}</td>
                    <td>${course.hours}</td>
                    <td>${course.start_date}</td>
                    <td><a href="../courses/course_page.html?place=${course._id}"><button class="detail_button">detail</button></a></td>`;
                } else if (window.innerWidth > 480) {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.time}</td>
                    <td>${course.status}</td>
                    <td>${course.hours}</td>
                    <td>${course.start_date}</td>
                    <td><a href="../courses/course_page.html?place=${course._id}"><button class="detail_button">detail</button></a></td>`;
                } else {
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.time}</td>
                    <td>${course.status}</td>
                    <td>${course.start_date}</td>
                    <td><a href="../courses/course_page.html?place=${course._id}"><button class="detail_button">detail</button></a></td>`;
                }
                let father;
                if (course.status == "ongoing")
                    father = document.querySelector("#ongoing_courses tbody");
                else if (course.status == "done")
                    father = document.querySelector("#done_courses tbody");
                else if (course.status == "waiting")
                    father = document.querySelector("#waiting_courses tbody");
                father.appendChild(tr);
                if (document.querySelector("#ongoing_courses tbody").innerHTML == "") {
                    document.querySelector("#ongoing_courses").style.display = "none";
                    document.getElementById("1").style.display = "none";
                } else {
                    document.querySelector("#ongoing_courses").style.display = "table";
                    document.getElementById("1").style.display = "block";
                }
                if (document.querySelector("#done_courses tbody").innerHTML == "") {
                    document.querySelector("#done_courses").style.display = "none";
                    document.getElementById("2").style.display = "none";
                } else {
                    document.querySelector("#done_courses").style.display = "table";
                    document.getElementById("2").style.display = "block";
                }
                if (document.querySelector("#waiting_courses tbody").innerHTML == "") {
                    document.querySelector("#waiting_courses").style.display = "none";
                    document.getElementById("0").style.display = "none";
                } else {
                    document.querySelector("#waiting_courses").style.display = "table";
                    document.getElementById("0").style.display = "block";
                }
                if (document.querySelector("#ongoing_courses tbody").innerHTML == "") {
                    document.querySelector("#ongoing_courses").style.display = "none";
                }
                else if (document.querySelector("#done_courses tbody").innerHTML == "") {
                    document.querySelector("#done_courses").style.display = "none";
                }
                else if (document.querySelector("#waiting_courses tbody").innerHTML == "") {
                    document.querySelector("#waiting_courses").style.display = "none";
                }
            });
        } else {
            document.getElementsByTagName("main")[0].innerHTML = `
            <h4 id="empty">You did not enroll in any course</h4>
            `;
        }
    }).catch(err => {
        window.location.assign("/500.html")
    });
}
function change_password_mode() {
    const eye = document.getElementById("password_eye");
    if (eye.checked == true) {
        document.getElementById("current-password").type = "text";
        document.getElementById("new-password").type = "text";
        document.getElementById("check-password").type = "text";
    } else {
        document.getElementById("current-password").type = "password";
        document.getElementById("new-password").type = "password";
        document.getElementById("check-password").type = "password";
    }
}