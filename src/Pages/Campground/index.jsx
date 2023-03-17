import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../Layout'
import Comments from './Comments';

function Campground() {
  const params = useParams();
  const input_id = params.id;

  const [sel_post,setSelectedPost] = useState();

  async function getCamp(){
    const req = await axios.get(`http://localhost:4000/api/v1/campground/${input_id}`);
    const data = await req.data;
    setSelectedPost(data);
  }

  useEffect(() => {
    getCamp()
  },[])



  if(sel_post === undefined) {return <div>Loading..</div>}

  return (
    <Layout>
      <div className='p-4'>
        <img className='w-full' src={sel_post.placeholderURL} alt="" />
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-4xl my-4'>{sel_post.title}</h1>
          <h3 className='font-semibold text-xl mr-4'>{`$${sel_post.price}/night`}</h3>
        </div>

        <span className='leading-7'>{sel_post.disc}</span>
        <Comments campgroundObj={sel_post} comments={sel_post.comments} />
      </div>
    </Layout>
  )
}

export default Campground