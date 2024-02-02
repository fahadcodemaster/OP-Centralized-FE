// import React from 'react';
// import Accordion from "react-bootstrap/Accordion";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Footer from '../components/footer';
// import { createGlobalStyle } from 'styled-components';
// import footerlogo from "../../assets/images/footer-logo.png";
// const GlobalStyles = createGlobalStyle`
//   header#myHeader.navbar.white {
//     background: white;
//   }
// `;

// const accordionFilter = () => (
//   <div>
//     <GlobalStyles />


//     <section className='container p-0'>
//       <div className='row justify-content-center'>

//         <div className='col-md-12'>
//           <div className='spacer-single'></div>
//           <Accordion className="filter-accordioan">
//             <div className='row'>
//               <div className='col-sm-12 col-md-3'>
//                 <Card>
//                   <Card.Header>
//                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
//                       Status <span><i class="fa fa-minus"></i><i class="fa fa-plus"></i></span>
//                     </Accordion.Toggle>
//                   </Card.Header>
//                   <Accordion.Collapse eventKey="0">
//                     <Card.Body>
//                       <ul class="status-checkbox">
//                         <li><a href="#">Buy Now</a></li>
//                         <li><a href="#">On Auction</a></li>
//                         <li><a href="#">New</a></li>
//                         <li><a href="#">Has Offers</a></li>
//                       </ul>
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//               </div>
//               <div className='col-sm-12 col-md-3'>
//                 <Card>
//                   <Card.Header>
//                     <Accordion.Toggle as={Button} variant="link" eventKey="1">
//                       Price
//                     </Accordion.Toggle>
//                   </Card.Header>
//                   <Accordion.Collapse eventKey="1">
//                     <Card.Body>
//                       <div className='row'>
//                         <div className='col-md-12'>
//                           <select className="form-control"  placeholder="Min" type="text">
//                             <option>$ Bitcoin</option>
//                             <option>$ Bitcoin</option>
//                             <option>$ Bitcoin</option>
//                           </select>
//                         </div>
//                         <div className='col-md-12'>
//                           <input className="form-control"  placeholder="Min" type="text" />
//                         </div>
//                         <div className='col-md-12'>
//                           <div className='to-space'> to</div>
//                         </div>
//                         <div className='col-md-12'>
//                           <input className="form-control" placeholder="Max" type="text" />
//                         </div>

//                         <div className='col-md-12 text-align-left'>
//                           <a className="reg-btn blue" href="#">Apply </a>
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//               </div>
//               <div className='col-sm-12 col-md-3'>
//                 <Card>
//                   <Card.Header>
//                     <Accordion.Toggle as={Button} variant="link" eventKey="2">
//                       Collections
//                     </Accordion.Toggle>
//                   </Card.Header>
//                   <Accordion.Collapse eventKey="2">
//                     <Card.Body>
//                       <div className='filter-search-input'>
//                         <input className="form-control" id="name_1" name="name_1" placeholder="Search Filter" type="text" />
//                         <ul className='collection-list'>
//                           <li>
//                             <a href="#">
//                               <div className='img-pnl'>
//                                 <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                               </div>
//                               <div className='txt-pnl'>Crypto Punks</div>
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <div className='img-pnl'>
//                                 <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                               </div>
//                               <div className='txt-pnl'>Crypto Punks</div>
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <div className='img-pnl'>
//                                 <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                               </div>
//                               <div className='txt-pnl'>Crypto Punks</div>
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//               </div>
//               <div className='col-sm-12 col-md-3'>
//                 <Card>
//                   <Card.Header>
//                     <Accordion.Toggle as={Button} variant="link" eventKey="3">
//                       Categories
//                     </Accordion.Toggle>
//                   </Card.Header>
//                   <Accordion.Collapse eventKey="3">
//                     <Card.Body>
//                       <ul className='collection-list'>
//                         <li>
//                           <a href="#">
//                             <div className='img-pnl'>
//                               <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                             </div>
//                             <div className='txt-pnl'>Crypto Punks</div>
//                           </a>
//                         </li>
//                         <li>
//                           <a href="#">
//                             <div className='img-pnl'>
//                               <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                             </div>
//                             <div className='txt-pnl'>Crypto Punks</div>
//                           </a>
//                         </li>
//                         <li>
//                           <a href="#">
//                             <div className='img-pnl'>
//                               <img src={footerlogo} alt={""} className="img-fluid d-block footer-logo" />
//                             </div>
//                             <div className='txt-pnl'>Crypto Punks</div>
//                           </a>
//                         </li>
//                       </ul>
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//               </div>
//             </div>

//           </Accordion>
//         </div>

//       </div>
//     </section>

//   </div>

// );
// export default accordionFilter;