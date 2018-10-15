var fs = require('fs'), stdin = process.stdin, stdout = process.stdout;
var stats = [];
var files = [];
fs.readdir(process.cwd(),function (err,files) {
    this.files = files;
    console.log('');
    if(!files.length) {
        return console.log('\033[31m nofiles to show !\033[39m\n');

    }
    console.log('select which file or directory you want to see \n');


    file(0);
});

function file(i) {
    var filename = this.files[i];
    if(filename) {
        fs.stat(__dirname + '/' + filename, function (err, stat) {
            stats[i] = stat;
            if(stat.isDirectory()) {
                console.log('  ' + i + ' \033[36m' + filename + '/\033[39m');
            }else{
                console.log('  ' + i + ' \033[90m' + filename + '\033[39m');
            }
            i++;
            if(i == files.length) {
                read();

            }else{
                file(i);
            }
        });
    }

}

function read() {
    stdin.on('data', option);
    console.log('');
    stdout.write(' \033[33mEnter your choice:\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
}

function option(data) {
    var filename = files[Number(data)];

    if(!filename) {
        stdout.write(' \033[31mEnter your choice \033[39m');
    }else{
        stdout.pause();
        fs.readFile(__dirname+'/'+filename,'utf-8',function (err,data) {
            console.log('');
            console.log('\033[31m' + data + '\033[39m');
        })
    }
}


