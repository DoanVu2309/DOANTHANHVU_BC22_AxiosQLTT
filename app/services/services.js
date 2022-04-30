function Services() {
    this.fetchData = function() {
        return axios({
            url: "https://6044315ca20ace001728eb80.mockapi.io/API/User",
            method: "GET",
        });
    };
    this.deleteUser = function(id) {
        return axios({
            url: `https://6044315ca20ace001728eb80.mockapi.io/API/User/${id}`,
            method: "DELETE",
        });
    };
    this.addUser = function(user) {
        return axios({
            url: "https://6044315ca20ace001728eb80.mockapi.io/API/User",
            method: "POST",
            data: user,
        });
    };
    this.getUserById = function(id) {
        return axios({
            url: `https://6044315ca20ace001728eb80.mockapi.io/API/User/${id}`,
            method: "GET",
        })
    }
    this.updateUser = function(id, user) {
        return axios({
            url: `https://6044315ca20ace001728eb80.mockapi.io/API/User/${id}`,
            method: "PUT",
            data: user,
        })
    }
}