import { useNavigate,Link } from "react-router-dom"

 const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className='d-flex flex-column justify-content align-items-center min-vh-100 bg-light text-center p-3'>
        <h1 className='display-1 fw-bold text-primary'>404</h1>
        <p className='lead mt-2 mb-4  text-danger'>Oops....! the page is you are looking for is not found</p>
        <div className="d-flex gap-3 flex-wrap align-items-center"> 
            <button className='btn btn-outline-primary btn-sm d-flex align-items-center'
            onClick={()=>navigate(-1)}>
                <i className='bi bi-arrow-left me-1'>Go Back</i>
            </button>
            <Link to={'/'} className='btn btn-primary btn-sm align-items-center'>
            <i className="bi bi-house-door">Home</i>
            </Link>
        </div>

    </div>
  )
}
 export default NotFound