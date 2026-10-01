export async function onRequest(context) {
    const { request, next } = context;
    const auth = request.headers.get("Authorization");
    // 如果没输入密码，弹出浏览器默认的登录框
    if (!auth || !auth.startsWith("Basic ")) {
        return new Response("需要密码才能访问", {
            status: 401,
            headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' }
        });
    }
    // 解码输入的账号密码
    const [user, pass] = atob(auth.split(" ")[1]).split(":");
    // 【⚠️这里要改！】把下面的 admin 和 mysecret123 换成你自己想要的账号和密码
    if (user === "tangpehu" && pass === "tangpehu78910") {
        return next();
    }
    return new Response("密码错误", { status: 401 });
}
