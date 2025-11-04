import cmm from './js/mysql.js'


        // 1.from 회의실 to 파트너포탈 : merge
        let sql = `select midx, ridx,name,prc_cd
                            ,DATE_FORMAT(met_dd, '%Y-%m-%d') met_dd
                            ,st_tm,ed_tm,reg_id
                            ,DATE_FORMAT(reg_dt, '%Y%m%d%H%i%s') reg_dt
                            ,file_Idx,file_Idx2,sidx,mail_title,mail_content,mail_content2,edi_seq
                    from tb_met
                    where 1=1
                    and ifnull(syn1,'N') <> 'Y'
                    order by midx
                    ;`
        
        try{
            // db1 대상조회
            const lst = await cmm.gfn_query(sql)
            console.log(`gfn_query 1-a success - ${JSON.stringify(lst)}`)
        
            for(let i=0; i<lst.length; i++){
                let mail_content = `${lst[i].mail_content}`.replace(/'/g,'"')
                let mail_content2 = `${lst[i].mail_content2}`.replace(/'/g,'"')
                // a.머지 문
                let _sql = `INSERT INTO tb_met
                            set 			
                            midx          =${lst[i].midx}
                            ,ridx         =${lst[i].ridx}
                            ,name         ='${lst[i].name            }'
                            ,prc_cd       ='${lst[i].prc_cd          }'
                            ,met_dd       ='${lst[i].met_dd          }'
                            ,st_tm        ='${lst[i].st_tm           }'
                            ,ed_tm        ='${lst[i].ed_tm           }'
                            ,reg_id       ='${lst[i].reg_id          }'
                            ,reg_dt       ='${lst[i].reg_dt          }'
                            ,file_Idx     ='${lst[i].file_Idx        }'
                            ,file_Idx2    ='${lst[i].file_Idx2       }'
                            ,sidx         ='${lst[i].sidx            }'
                            ,mail_title   ='${lst[i].mail_title      }'
                            ,mail_content ='${mail_content          }'
                            ,mail_content2='${mail_content2          }'
                                                        
                        ON DUPLICATE KEY UPDATE
                            ridx         =${lst[i].ridx}
                            ,name         ='${lst[i].name            }'
                            ,prc_cd       ='${lst[i].prc_cd          }'
                            ,met_dd       ='${lst[i].met_dd          }'
                            ,st_tm        ='${lst[i].st_tm           }'
                            ,ed_tm        ='${lst[i].ed_tm           }'
                            ,reg_id       ='${lst[i].reg_id          }'
                            ,reg_dt       ='${lst[i].reg_dt          }'
                            ,file_Idx     ='${lst[i].file_Idx        }'
                            ,file_Idx2    ='${lst[i].file_Idx2       }'
                            ,sidx         ='${lst[i].sidx            }'
                            ,mail_title   ='${lst[i].mail_title      }'
                            ,mail_content ='${mail_content          }'
                            ,mail_content2='${mail_content2          }'
                ;`
                _sql = _sql.replace(/'null'/g,null) //널처리
                console.log(`_sql - ${_sql}`)
        
                const ret = await cmm.gfn_query2(_sql)
                console.log(`gfn_query2 1-a - ${JSON.stringify(ret)}`)
        
                // _sql = "update tb_met set mail_content   = quote("+ lst[i].mail_content +") where midx = " + lst[i].midx + ";"
                // _sql = "update tb_met set mail_content   = '"+ `${lst[i].mail_content}`.replace(/'/g,'"') +"' where midx = " + lst[i].midx + ";"
                // await cmm.gfn_query2(_sql)
                

                // b.syn성공 결과처리
                _sql = `update tb_met
                            set syn1     ='Y'			
                        where midx = ${lst[i].midx}
                            ;
                        `
                const ret2 = await cmm.gfn_query(_sql)
                console.log(`gfn_query2 1-b ret2 - ${ret2}`)
        
                    
            } //for
        }
        catch(err){
            console.log(`gfn_query 1-a err - ${err}`)
        }
        
        