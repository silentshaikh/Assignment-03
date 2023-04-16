 (async ()=>{

        const response = await fetch('./data.json');
        const data = await response.json();
        
        let extGenre = () => {
            let gen = [];
            data.forEach(e => {
                e.genres.forEach(genre => {
                    if (gen.includes(genre) == false) {
                        gen.push(genre);
                    }
                });
            });
            return gen.sort();
        }
        
        let extLang = () => {
            let lang = [];
            data.forEach(e => {
                if (lang.includes(e.original_language) == false) {
                    lang.push(e.original_language);
                }
            });
            return lang.sort();
        }

        let extRate = () => {
            let rate = [];
            data.forEach(e => {
                if (rate.includes(e.vote_average) == false) {
                    rate.push(+e.vote_average);
                }
            });
            return rate.sort();
        }

        let extYear = () => {
            let year = [];
            data.forEach(e => {
                let date = e.release_date.split('-')
                let yearar = date[0]
                if (year.includes(+yearar) == false) {
                    year.push(+yearar);
                }
            });
            return year.sort();
        }

        let myGen = extGenre();
        let mylang = extLang();
        let myrate = extRate();
        let myYear = extYear();

        let fGen = document.getElementById('genre');
        let fYear = document.getElementById('year');
        let fLang = document.getElementById('lang');
        let fRate = document.getElementById('rate');
        let table = document.getElementById('table');

        const result = (a,data) => {
            let movBox = document.createElement('div');
            movBox.className = "tab";
            let movimgBox = document.createElement('img');
            let movBox2 = document.createElement('div');
            movBox2.className = "tab2";
            let movHead = document.createElement('h3');
            let movPara = document.createElement('p');
            movimgBox.src = "https://image.tmdb.org/t/p/w45"+data.poster_path ;
            movHead.innerHTML = data.title ;
            movPara.innerHTML = `<span class="cer">${data.certification}</span> ${data.genres.map((genre)=>genre)} ${Math.floor(data.runtime/60)}h ${data.runtime%60}m `
            movBox.appendChild(movimgBox);
            movBox.appendChild(movBox2);
            movBox2.appendChild(movHead)
            movBox2.appendChild(movPara)
            let rowMov = table.insertRow();
            let rank = rowMov.insertCell(0);
            let movie = rowMov.insertCell(1);
            let year = rowMov.insertCell(2);
            rank.innerHTML = a ;
            movie.appendChild(movBox)  ;
            year.innerHTML = `${data.release_date.split('-')[0]}` ;
            rank.style.textAlign = "center";
        //    movimgBox.style.margin = "auto";
        }
        const filt = ()=>{
            let filData = data.filter((obj)=>{
                return fGen.value !== 'All'?obj.genres.includes(fGen.value):obj;
            })
            filData = filData.filter((obj)=>{
                return fYear.value !== 'All'?obj.release_date.includes(fYear.value):obj;
            })
            filData = filData.filter((obj)=>{
                return fLang.value !== 'All'?obj.original_language.includes(fLang.value):obj;
            })
            filData = filData.filter((obj)=>{
                return fRate.value !== 'All'?obj.vote_average == fRate.value:obj;
            })
            console.log(filData);
            table.innerHTML = ``;
           
            
            
            setTimeout(() => {
                table.innerHTML = `
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th class="mov">Movie</th>
                        <th>Year</th>
                    </tr>
                </thead>
                `;
                filData.forEach((data,a ) => { 
                 result(a+1,data)
                });
            }, 1500);
        }

        let opt = (e,data) => {
            data.forEach(value => {
                let optMov = document.createElement('option');
                optMov.value = value;
                optMov.text = value;
                e.appendChild(optMov)
            });
            e.addEventListener('change',filt);
        }

        opt(fGen,myGen);
        opt(fYear,myYear);
        opt(fLang,mylang);
        opt(fRate,myrate);

    }
)();

