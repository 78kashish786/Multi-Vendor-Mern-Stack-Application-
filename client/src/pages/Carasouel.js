import React from 'react'

const Carasouel = () => {
  return (
    <div class="bbb_viewed ">
    <div class="container border">
        <div class="row d-flex flex-row justify-content-between">
            <div class="col">
               <div class="bbb_main_container ">
                <div class="bbb_viewed_title_container">
                    <h3 class="bbb_viewed_title">Best selling products</h3>
                    <div class="bbb_viewed_nav_container">
                        <div class="bbb_viewed_nav bbb_viewed_prev"><i class="fas fa-chevron-left"></i></div>
                        <div class="bbb_viewed_nav bbb_viewed_next"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
                <div class="bbb_viewed_slider_container ">
                    <div class="owl-carousel owl-theme bbb_viewed_slider d-flex flex-row justify-content-between">
                        <div class="owl-item">
                            <div class="bbb_viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924153/alcatel-smartphones-einsteiger-mittelklasse-neu-3m.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹12225<span>₹13300</span></div>
                                    <div class="bbb_viewed_name"><a href="#">Alkatel Phone</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                        <div class="owl-item">
                            <div class="bbb_viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924221/51_be7qfhil.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹30079</div>
                                    <div class="bbb_viewed_name"><a href="#">Samsung LED</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                        <div class="owl-item">
                            <div class="bbb_viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924241/8fbb415a2ab2a4de55bb0c8da73c4172--ps.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹22250</div>
                                    <div class="bbb_viewed_name"><a href="#">Samsung Mobile</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                        <div class="owl-item">
                            <div class="bbb_viewed_item is_new d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924275/images.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹1379</div>
                                    <div class="bbb_viewed_name"><a href="#">Huawei Power</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                        <div class="owl-item">
                            <div class="bbb_viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924361/21HmjI5eVcL.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹225<span>₹300</span></div>
                                    <div class="bbb_viewed_name"><a href="#">Sony Power</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                        <div class="owl-item">
                            <div class="bbb_viewed_item d-flex flex-column align-items-center justify-content-center text-center">
                                <div class="bbb_viewed_image"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924241/8fbb415a2ab2a4de55bb0c8da73c4172--ps.jpg" alt=""/></div>
                                <div class="bbb_viewed_content text-center">
                                    <div class="bbb_viewed_price">₹13275</div>
                                    <div class="bbb_viewed_name"><a href="#">Speedlink Mobile</a></div>
                                </div>
                                <ul class="item_marks">
                                    <li class="item_mark item_discount">-25%</li>
                                    <li class="item_mark item_new">new</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
               </div> 
            </div>
        </div>
    </div>
</div>
  )
}

export default Carasouel