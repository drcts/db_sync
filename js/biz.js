import cmm from './mysql.js'


export default {
    fn_syn : async function(){


        /*********************************
         * tb_met 동기화
         */
        console.log(`**************************** tb_met 동기화 ****************************`)

        // 0.from 회의실 to 파트너포탈 : delete
        let sql = `select midx
                    from tb_met_del
                    where 1=1
                    and ifnull(syn1,'N') <> 'Y'
                    order by midx
                    ;`
        
        try{
            // db1 삭제대상조회
            const lst = await cmm.gfn_query(sql)
            console.log(`gfn_query 1-0 success - ${JSON.stringify(lst)}`)
        
            for(let i=0; i<lst.length; i++){
        
                // a.삭제 문
                let _sql = `delete from tb_met where midx = ${lst[i].midx} ;`
                console.log(`_sql - ${_sql}`)
        
                const ret = await cmm.gfn_query2(_sql)
                console.log(`gfn_query2 1-0 - ${JSON.stringify(ret)}`)
        
                // b.syn성공 결과처리
                _sql = `update tb_met_del
                            set syn1     ='Y'			
                        where midx = ${lst[i].midx}
                            ;
                        `
                const ret2 = await cmm.gfn_query(_sql)
                console.log(`gfn_query2 1-0 ret2 - ${ret2}`)
        
                    
            } //for
        }
        catch(err){
            console.log(`gfn_query 1-a err - ${err}`)
        }
        
                    


        // 1.from 회의실 to 파트너포탈 : merge
        sql = `select midx, ridx,name,prc_cd
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        /*********************************
         * tb_met_usr 양방향 동기화
         */
        console.log(`**************************** tb_met_usr 양방향 동기화 ****************************`)


        // 0.from 회의실 to 파트너포탈 : delete
        sql = `select midx, idx
                    from tb_met_usr_del
                    where 1=1
                    and ifnull(syn1,'N') <> 'Y'
                    order by midx
                    ;`
        
        try{
            // db1 삭제대상조회
            const lst = await cmm.gfn_query(sql)
            console.log(`gfn_query 2-0 success - ${JSON.stringify(lst)}`)
        
            for(let i=0; i<lst.length; i++){
        
                // a.삭제 문
                let _sql = `delete from tb_met_usr where midx = ${lst[i].midx} and idx = ${lst[i].idx} ;`
                console.log(`_sql - ${_sql}`)
        
                const ret = await cmm.gfn_query2(_sql)
                console.log(`gfn_query2 2-0 - ${JSON.stringify(ret)}`)
        
                // b.syn성공 결과처리
                _sql = `update tb_met_usr_del
                            set syn1     ='Y'			
                        where midx = ${lst[i].midx} and idx = ${lst[i].idx} 
                            ;
                        `
                const ret2 = await cmm.gfn_query(_sql)
                console.log(`gfn_query2 2-0 ret2 - ${ret2}`)
        
                    
            } //for
        }
        catch(err){
            console.log(`gfn_query 1-a err - ${err}`)
        }
        
                
        
        // 1.from 회의실 to 파트너포탈 : merge
        sql = `select midx,idx,user_id,attend_yn,attend_typ,deputy_id,absent_typ
                            ,regexp_replace(absent_desc,"'",'') absent_desc
                            ,send_id
                            ,DATE_FORMAT(send_dt, '%Y%m%d%H%i%s') send_dt
                            ,reply_id
                            ,DATE_FORMAT(reply_dt, '%Y%m%d%H%i%s') reply_dt
                            ,reg_id
                            ,DATE_FORMAT(reg_dt, '%Y%m%d%H%i%s') reg_dt
                    from tb_met_usr 
                    where 1=1
                    and ifnull(syn1,'N') <> 'Y'
                    order by midx
                    ;`
        
        try{
            // db1 대상조회
            const lst = await cmm.gfn_query(sql)
            console.log(`gfn_query 1-a success - ${JSON.stringify(lst)}`)
        
            for(let i=0; i<lst.length; i++){
        
                // a.머지 문
                let _sql = `INSERT INTO tb_met_usr 
                            set 			
                                midx        = ${lst[i].midx}
                                ,idx        = ${lst[i].idx}
        
                                ,user_id	='${lst[i].user_id    }'
                                ,attend_yn  ='${lst[i].attend_yn  }'
                                ,attend_typ ='${lst[i].attend_typ }'
                                ,deputy_id  ='${lst[i].deputy_id  }'
                                ,absent_typ ='${lst[i].absent_typ }'
                                ,absent_desc='${lst[i].absent_desc}'
                                ,send_id    ='${lst[i].send_id    }'
                                ,send_dt    ='${lst[i].send_dt    }'
                                ,reply_id   ='${lst[i].reply_id   }'
                                ,reply_dt   ='${lst[i].reply_dt   }'
                                ,reg_id     ='${lst[i].reg_id     }'
                                ,reg_dt     ='${lst[i].reg_dt     }'
                                ,syn2     ='Y'  
                                                        
                        ON DUPLICATE KEY UPDATE
                                user_id	=    '${lst[i].user_id    }'
                                ,attend_yn  ='${lst[i].attend_yn  }'
                                ,attend_typ ='${lst[i].attend_typ }'
                                ,deputy_id  ='${lst[i].deputy_id  }'
                                ,absent_typ ='${lst[i].absent_typ }'
                                ,absent_desc='${lst[i].absent_desc}'
                                ,send_id    ='${lst[i].send_id    }'
                                ,send_dt    ='${lst[i].send_dt    }'
                                ,reply_id   ='${lst[i].reply_id   }'
                                ,reply_dt   ='${lst[i].reply_dt   }'
                                ,reg_id     ='${lst[i].reg_id     }'
                                ,reg_dt     ='${lst[i].reg_dt     }'
                    ;`
                _sql = _sql.replace(/'null'/g,null) //널처리
                
                const ret = await cmm.gfn_query2(_sql)
                console.log(`gfn_query2 1-b - ${JSON.stringify(ret)}`)
        
                // b.syn성공 결과처리
                _sql = `update tb_met_usr 
                            set syn1     ='Y'			
                        where midx = ${lst[i].midx}
                            and idx = ${lst[i].idx};
                        `
                const ret2 = await cmm.gfn_query(_sql)
                console.log(`gfn_query2 1-b ret2 - ${ret2}`)
        
                    
            } //for
        } catch(err){
            console.log(`gfn_query 1-b err - ${err}`)
        }
        
        
        
        
        
        // 2.from 파트너포탈 to 회의실 : update
        let sql2 = `select midx,idx,attend_yn,attend_typ,deputy_id,absent_typ
                    ,regexp_replace(absent_desc,"'",'') absent_desc
                    ,reply_id
                    ,DATE_FORMAT(reply_dt, '%Y%m%d%H%i%s') reply_dt
                    from tb_met_usr 
                    where 1=1
                    and ifnull(syn2,'N') <> 'Y'
                    order by midx
                    ;`
        
        try{
            // db2 대상조회
            const lst2 = await cmm.gfn_query2(sql2)
            console.log(`gfn_query 2-a success - ${JSON.stringify(lst2)}`)
        
            for(let i=0; i<lst2.length; i++) {
        
                // a.업데이트 문
                let _sql = `update tb_met_usr 
                            set attend_yn	='${lst2[i].attend_yn     }'
                                ,attend_typ	='${lst2[i].attend_typ    }'
                                ,deputy_id	='${lst2[i].deputy_id     }'
                                ,absent_typ	='${lst2[i].absent_typ    }'
                                ,absent_desc='${lst2[i].absent_desc   }'
                                ,reply_id	='${lst2[i].reply_id      }'
                                ,reply_dt	='${lst2[i].reply_dt      }'
                                
                                where midx = ${lst2[i].midx} and idx = ${lst2[i].idx}
        
                    ;`
                _sql = _sql.replace(/'null'/g,null) //널처리
                    
                const ret = await cmm.gfn_query(_sql)
                console.log(`gfn_query 2-b ret - ${JSON.stringify(ret)}`)
        
                // b.syn성공 결과처리
                _sql = `update tb_met_usr 
                            set syn2 ='Y'			
                        where midx = ${lst2[i].midx}
                            and idx = ${lst2[i].idx}
                        ;`
                const ret2 = await cmm.gfn_query2(_sql)
                console.log(`gfn_query 2-b2 ret2 - ${JSON.stringify(ret2)}`)
        
            }
        }catch(err){
            console.log(`gfn_query2 2-a err - ${err}`)
        }
        


    }


}
