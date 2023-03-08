import fs from "fs";
import path from "path";

const copy = (file, dest) => {
    fs.copyFile(file, dest, (err) => {
        if (!err) {
            console.log("copied", file, "->", dest);
            return;
        }

        console.error("failed to copy", file, "err:", err);
        process.exit(-1);
    });
};

const copyDir = (dir, dest) => {
    fs.readdirSync(dir).map((file) => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        if (fs.lstatSync(path.join(dir, file)).isFile()) {
            copy(path.join(dir, file), path.join(dest, file));
        } else {
            copyDir(path.join(dir, file), path.join(dest, file));
        }
    });
};

copy("src/resource.toml", "resources/freeroam/resource.toml");
copyDir("webview/dist", "resources/freeroam/webview");
