function Validation() {
    // Kiểm tra rỗng
    this.checkNull = function(value, errorID, mess) {
        if (value === "") {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        } else {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        }
    };
    // Kiểm tra trùng tài khoản
    this.checkAccount = function(arr, value, errorID, mess) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].taiKhoan === value) {
                getEle(errorID).innerHTML = mess;
                getEle(errorID).style.display = "block";
                return false;
            }
        }
        return true;
    };
    // Kiểm tra độ dài ký tự
    this.checkLength = function(value, errorID, mess, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    };
    // Kiểm tra ký tự dạng chuỗi
    this.checkString = function(value, errorID, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    };
    // Kiểm tra ký tự dạng số
    this.checkNumber = function(value, errorID, mess) {
        var letter = "^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$";
        if (value.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    };
    // Kiểm tra email
    this.checkEmail = function(value, errorID, mess) {
        var letter =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (value.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    };
    // Kiểm tra mật khẩu
    this.checkPass = function(value, errorID, mess) {
        var letter = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (value.match(letter)) {
            getEle(errorID).innerHTML = "";
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    };
    // Kiểm tra dạng select
    this.checkSelect = function(idSelect, errorID, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "none";
            return true;
        } else {
            getEle(errorID).innerHTML = mess;
            getEle(errorID).style.display = "block";
            return false;
        }
    }
}