
export class Controller{
    static show(req,res){
        res.sendFile(process.cwd()+'/public/main.html')
    }
}