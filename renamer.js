const fs=require('fs');
const path=require('path');

const folder=process.argv[2];
const directoryPath=path.join(__dirname,`../${folder}`);

const content=(foldername)=>{
    const data=fs.readdirSync(foldername);
    return data;
}   

const change=(dir,originalName,newName)=>{
    const prevPath=path.join(dir,originalName);
    const newPath=path.join(dir,newName);
    // console.log(prevPath);
    // console.log(newPath);
    fs.renameSync(prevPath,newPath)
}

const GenRegex=/WINSEM[0-9]{4}-[0-9]{2}_[A-Z]{3}[0-9]{4}_[A-Z]*_VL[0-9]{13}_Reference_Material_[IVXL]*_([0-9]{2}-[A-Za-z]*-[0-9]{4})_(.+)*/

const files=content(directoryPath);

let data=[];
let captured=0;
files.forEach(fileName => {
    const regexVerdict=fileName.match(GenRegex);
    if (regexVerdict!=null)
    {
        data.push(regexVerdict);
        captured+=1;
    }
    else{
        console.log(fileName);
    } 
});

console.log((captured==files.length-1)?"Ok":"Not Ok");
data.sort((a,b)=>{
    return new Date(a[1])-new Date(b[1]);
});

let count=0;
data.forEach(element => {
    count+=1;
    change(directoryPath,element[0],`${count}___${element[1]}__${element[2]}`);
});

console.log(`Parsed ${count} files out of ${files.length} files`);


// Test-data:
// {Will use it later const} CatRegex=/WINSEM[0-9]{4}-[0-9]{2}_[A-Z]{3}[0-9]{4}_[A-Z]*_VL[0-9]{13}_([A-za-z0-9-_.\\()]*)/
// const fileName1='WINSEM2020-21_CSE2008_ETH_VL2020210503823_Reference_Material_III_01-Feb-2021_Attacks2_32.ppt';
// const fileName2='WINSEM2020-21_CSE2008_ETH_VL2020210503823_CAT-1_QP___KEY_NS_B1_CAT_-1_QP_and_KEY_33.docx';
// const fileName3='WINSEM2020-21_CSE2008_ETH_VL2020210503823_Reference_Material_III_01-Feb-2021_';

// const catFileName1='WINSEM2020-21_CSE2008_ETH_VL2020210503823_CAT-1_QP___KEY_NS_B1_CAT_-1_QP_and_KEY_33';
// const catFileName2='WINSEM2020-21_CSE2008_ETH_VL2020210503823_CAT-2_QP___KEY_NS_B1_CAT_-2_QPandKEY_34';

// const cattestverdict1=catFileName1.match(CatRegex);
// const cattestverdict2=catFileName2.match(CatRegex);

// console.log(cattestverdict1);
// console.log(cattestverdict2);

// const final1=fileName1.match(GenRegex);
// console.log(`1____${final1[1]}_${final1[2]}`)
// console.log(final1);