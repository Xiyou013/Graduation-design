

export default {
    userLogin(tel, password) {
        console.log('112233')
        // return this.$axios.get(`/api/www/userLogin/${tel}/${password}`);
        var res = this.$axios.get(
            `/api/admin/user/${tel}/${password}`
        );
        return res;
    },


}