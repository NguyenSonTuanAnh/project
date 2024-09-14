//Button_status

const buttonStatus = document.querySelectorAll("[button_status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button_status");

            if (status) {
                url.searchParams.set("status", status);
                url.searchParams.set("page", "1");
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
};


//Form search

const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

//Pagination

const button = document.querySelectorAll("[button-pagination]");
if (button) {
    let url = new URL(window.location.href);
    button.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}

//checkbox multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputID = checkBoxMulti.querySelectorAll("input[name=id]");
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputID.forEach(input => {
                input.checked = true;
            })
        } else {
            inputID.forEach(input => {
                input.checked = false;
            });
        }
    })
    inputID.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputID.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }

        });
    })
}

//form change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        const typeChange = event.target.elements.type.value;
        console.log(typeChange);
        if (typeChange == "deleteAll") {
            const isConfirm = confirm("Bạn có chắc muốn xóa tất cả sản phẩm này không?");
            if (!isConfirm) {
                return;
            }
        }
        if (inputChecked.length > 0) {
            let ids = [];
            inputChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "changePosition") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;

                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            });
            const input = formChangeMulti.querySelector("input[name='ids']");
            input.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Chon it nhat 1 ban ghi");
        }
    })
}

//Delete element

const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfrim = confirm("Bạn có chắc là muốn xóa không?");
            if (isConfrim) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                formDeleteItem.submit();
            };
        });
    });
};

//show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = showAlert.getAttribute("data-time");
    const buttonClose = document.querySelector(".close-alert");
    buttonClose.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
       
    },parseInt(time));
}