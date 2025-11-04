import cmm from './js/mysql.js'


let sql = `select midx, name from tb_met ;`


cmm.gfn_select(sql).then((res)=>{

    console.log(`gfn_select success - ${JSON.stringify(res)}`)
}).
catch((err) => console.log(`gfn_select err - ${err}`));