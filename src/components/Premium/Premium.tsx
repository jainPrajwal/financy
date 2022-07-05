import { useEffect, useState } from "react";
import { Payment } from "../../constants/payment.types";
import { useProfile } from "../../hooks/useProfile";
import { displayRazorPayModal } from "../../services/payment/displayRazorpayModal";
import { default as common } from "../../common/common.module.css";
import { RiShieldFlashFill } from "react-icons/ri";
import { useAsync } from "../../hooks/useAxios";
import { getPaymentDetailsService } from "../../services/payment/getPaymentDetailsService";

export const Premium = ({ header }: { header: string }) => {
    const { userProfile, setUserProfile } = useProfile();
    const [paymentDetails, setPaymentDetails] = useState<Payment | null>(null);

    const { btnGetPremium, premiumWrapper } = common;

    const { execute, response, status } = useAsync(getPaymentDetailsService, false, null);
    useEffect(() => {
        try {
            if (!paymentDetails) {
                execute(null);
            }
        } catch (error) {
            console.error(`error `, error)
        }

    }, []);

    useEffect(() => {

        try {
            if (status === `success`) {
                const { status, data: { payment, success, message } } = response;
                if (status === 200 && success && payment?.length > 0) {

                    setPaymentDetails({
                        orderId: payment[0].order_id,
                        paymentId: payment[0].payment_id
                    })
                }
            }
        } catch (error) {
            console.error(`error`, error);

        }
    }, [status, response])
    return <div className={`${premiumWrapper} p-lg text-white`}>

        <div className={`header-secondary  text-center mb-lg`}>
            {header}
        </div>

        <div
            className={`d-flex ai-center f-direction-col mb-lg`}
        >
            <ul className="w-100" style={{ maxWidth: `320px` }}>
                <li className="d-flex p-lg">
                    <svg
                        className="premium-pink"
                        aria-hidden="false" width="24" height="24" viewBox="0 0 8 12"><path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor"></path><path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor"></path></svg>
                    <span className="pl-md">View Stats On Uploaded Videos</span>
                </li>
                <li className="d-flex p-lg">
                    <svg
                        className="premium-purple"
                        width={`24`} height={`24`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="pl-md">Watch Premium Videos</span>
                </li>
                <li className="d-flex p-lg">
                    <svg
                        className="premium-gold"
                        width={`24`} height={`24`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>

                    <span className="pl-md">Lifetime Free Access</span>
                </li>
                {!userProfile?.isAPremiumMember && <li className="d-flex p-lg">
                    <button
                        onClick={() => displayRazorPayModal({ setPaymentDetails, setUserProfile })}
                        className={`btn ${btnGetPremium} my-1`}>
                        <span className="mr-md">
                            <RiShieldFlashFill size={20} />
                        </span>
                        {`get premium`.toUpperCase()}</button>
                </li>}
                {userProfile?.isAPremiumMember &&
                    <li className="p-lg">
                        <ul>
                            <li className="header-secondary text-center my-md">Payment Details</li>
                            <li className={`py-lg`}>
                                Order Id: <span className="fs-2">{`${paymentDetails?.orderId}`}</span>
                            </li>
                            <li className={`py-lg`}>
                                Payment Id: <span className="fs-2">{`${paymentDetails?.paymentId}`}</span>
                            </li>
                        </ul>
                    </li>}

            </ul>


        </div>



        {userProfile?.isAPremiumMember &&
            <div className="d-flex ai-center f-direction-col my-1">

                <ul >

                </ul>

            </div>}


    </div>
}