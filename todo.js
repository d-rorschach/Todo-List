
var i=0;
var n=0;
var arr=[];

function print(i,x,y)
{
  document.getElementById('add').innerHTML +=(`
  <div class="col mb-4">
    <div class="card h-100 text-white bg-dark " id = "` +i+  `" style="width: 99%;"> 
      <div class="card-body"><h5 id="title` +i+  `" class="card-title">`+x+
        `</h5><p id="work` +i+  `" class="card-text">`+y+
        `</p>
        <div style="display:none">
          <div class="input-group col-md-12 col-md-offset-12">
            <input type="text" id="newtitle` +i+ `" class="form-control" placeholder="enter new title" aria-label="Example text with button addon" aria-describedby="button-addon1" required>
          </div>
          
          <div class="input-group col-md-12 col-md-offset-12">
            <input type="text" id="newwork` +i+ `" class="form-control" placeholder="enter new description" aria-label="Recipient's username" aria-describedby="button-addon2" required>
            <div class="input-group-append">
              <button class="btn btn-success" type="button"  onclick="update(this)">save</button>
            </div>
          </div>

        </div>
        <button type="button" class="btn btn-outline-primary" onclick="showopt(this.parentNode)">Update</button>
        <button type="button" class="btn btn-outline-danger" onclick="del(this.parentNode.parentNode.id)">Delete</button>
      </div>
    </div>
  </div>
  `);
}
function show()
{
  arr=JSON.parse(localStorage.getItem('arr'));
  try
  {
    n=arr.length;
  }
  catch(err)
  {
    n=0;
    arr=[];
  }
  for(i=0;i<n;i++)
  {
    let obj=arr[i];
    let x=obj['title'];
    let y=obj['work'];
    print(i,x,y);
  }
}

window.onload= show();

function del_all()
{
  localStorage.clear();
  arr=[];
  n=0;
  i=0;
  document.getElementById('add').innerHTML="";
}

function addcard()
{
    let x=document.getElementById('title').value;
    let y=document.getElementById('work').value;

    let obj={
      id:i,
      title:x,
      work:y,
    };
    arr.push(obj);
    localStorage.setItem('arr',JSON.stringify(arr));
    print(i,x,y);
    ++i;
}

function showopt(p)
{ 
  childs=p.children;
  childs[2].style.display="block";
}

function update(cid)
{
  eid=cid.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  let pid=parseInt(eid);
  let t=document.getElementById('newtitle'+pid).value;
  let w=document.getElementById('newwork'+pid).value;
  let obj={
    id:pid,
    title:t,
    work:w,
  };
  arr[pid]=obj;
  localStorage.setItem('arr', JSON.stringify(arr));
  document.getElementById("title"+pid).innerHTML=t;
  document.getElementById("work"+pid).innerHTML=w;
  cid.parentNode.parentNode.parentNode.style.display="none";

}

function del(eid)
{
  let pid=parseInt(eid);
  arr.splice(pid, 1);
  localStorage.setItem('arr', JSON.stringify(arr));
  document.getElementById('add').innerHTML="";
  i=0;
  show();
}

function search()
{
  input=document.getElementById("searchinput").value;
  document.getElementById('add').innerHTML="";
  if(input=="")
  {
    show();
  }
  else
  {
    let c=0;
    for(let k=0;k<arr.length;k++)
    {
      let str=arr[k]['title'];
      let f=str.search(input);
      if(f!=-1)
      {
        ++c;
        print(i,arr[k]['title'],arr[k]['work']);
      }
    }
    if(c==0)
    {
      document.getElementById('add').innerHTML +="<h1>No Match Found</h1>"
    }
  }
}