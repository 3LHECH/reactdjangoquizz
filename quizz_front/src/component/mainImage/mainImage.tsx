

export default function MainImage() {
    return (
        <div className="wrapper">
            <div className="section section-hero section-shaped">
                <div className="shape shape-style-1 shape-primary">
                    <span className="span-150"></span>
                    <span className="span-50"></span>
                    <span className="span-50"></span>
                    <span className="span-75"></span>
                    <span className="span-100"></span>
                    <span className="span-75"></span>
                    <span className="span-50"></span>
                    <span className="span-100"></span>
                    <span className="span-50"></span>
                    <span className="span-100"></span>
                </div>
                <div className="page-header">
                    <div className="container shape-container d-flex align-items-center py-lg">
                        <div className="col px-0">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <img 
                                        src="./assets/img/brand/white.png" 
                                        style={{ width: '200px' }} 
                                        className="img-fluid" 
                                        alt="Brand Logo"
                                    />
                                    <p className="lead text-white">
                                        A beautiful Design System for Bootstrap 4. It's Free and Open Source.
                                    </p>
                                    <div className="btn-wrapper mt-5">
                                    </div>
                                    <div className="mt-5">
                                        <small className="font-weight-bold mb-0 mr-2 text-white">
                                            *proudly coded by
                                        </small>
                                        <img 
                                            src="./assets/img/brand/creativetim-white-slim.png" 
                                            style={{ height: '28px' }} 
                                            alt="Creative Tim"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
