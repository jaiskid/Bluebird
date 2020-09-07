import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Button } from "react-materialize";
import { userRef } from "../firebase";
import moment from "moment";
import deletePost from "../api/deletePost";

export default ({ details, myUID }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const getName = () => {
      userRef.child(details.createdBy).once("value", snap => {
        setFirstName(snap.val()["firstName"]);
        setLastName(snap.val()["lastName"]);
        setImageURL(snap.val()["imageURL"]);
      });
    };
    if (details && details.createdBy) {
      getName();
    }
  });

  const onPostDelete = (event, postKey) => {
    event.preventDefault();
    const result = deletePost(postKey);
    console.log(result);
  };

  return (
    <div>
      <div className="outerBox m10">
        <div>
          <div>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={
                      imageURL
                        ? imageURL
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUAAAD////+/v4BAQH7+/v4+Pjb29vp6en19fXs7Ow/Pz8mJiaNjY3V1dXd3d3KysoWFhaWlpa4uLhzc3OhoaFSUlIODg5fX18wMDAeHh6xsbFubm5mZmadnZ2/v79+fn4pKSmGhoYaGhphYWEvLy9GRkY6OjqqqqpKSkrGxsZ5eXlXV1fozyK8AAASS0lEQVR4nN1dCYPqKAwGWm092nrUqvUaR0ffzPz//7ckQK32sAUcdbNv35vDUj4SAglJIFSXGCv+iDL8m1KXAcEXPS+M0ng4nX8tBstR4jhOMloOFl/z6TBOo9DrudgWfFr8MaPi88RmY+rHsp9+kA7Xs/6S5Mm5+m7Zn62HaeBfWmQwPPqdKpIBwgIJPiDnvOB8+LzB5cB/Dv7P/yZOHutofg48F6XAKjxqHSFyIRiv+gnikigQVv4HErYAKn846q82gWrHYq+sIqS0003XV+IoADg5+XTyQCVXiaN+u067ndI5rk2mCJn8G/vkxeuB7DdpSpdPSmYO1mdPtswu/zwPodQsHGIY9xvDukf9OGRCwQola9I9W1Ia/RzJ7TzTIjlljz8RlTPbDKE5D0E8u+MRsYNPYkTZHY271MIaaYYQX97dD6S6tAJQKSfe2GDPMbrPmYdM/eNvZ5dhd24XdE2IoiFsarb1JRN1ceoilLuy7ZzYQVUOFVqeb7OV9g8Rijd2tn055A/DiNTfdgx2Ado8pDRYXy3ojyIYvnWkCU8XIQxod0UkwMcilK2vurps1EHIXNrZSP35wFmoIIq9zmDT0dM2bRHiJsqdJOTx0G4pmbhi9W/HyzYI5UaK9qbk0cqlnH48DVFthRDxdeJEAHwCxuTcab1ytEPINxhexsC/RojTcerBLHkUQoA4Icqg/XMWyokxecg8FNObD94ueYZw5mGSZIe+q8Z6tSEPhZEWLZ4y+24gklOkIDZB2ZSHML0nS2v2gwlEhywnfCo29cg1llLa2T1pjbgBiH92HdSo9njIm+qtMk/KkyFiJ1a9phOxGUKXhsu8R+ypCIUuWIboWLeAULgRov4rgMuRQ/pRsw3OfR4yPqXP1pwwdkgI07nRHrUBDxmNk9cQ0IzEpjGJm3CxCcLxH9jxbUl0Z9zATXUfIR3mDh5ehqTaG9as+5K/dQhxnXf3zwZTRQhxX+rCkWcNeCpQy0PYGe1fTMnkCLu1L+Nh/if3eDhsd87yl6QE9c72rQYhcH8s23pJkluscaW2uSuljG3IS+xFyymbPJvK/tfxEHcy6autg1eUnbgm57o1oxyh3Kq9MANzxLsY4c6rDUIck+7pZbXoNTnkVOMvrkLIWG/5ejuZMsJODrxKQa3kob96B3gy1sEhq04FwOp5uHuaU7QlSUHbZbPrLkLhdJo8u+PtyAEvY7mgFhAKmytavgH3LgRyuozKwzbKeei+ixqVhFPxVH44VYKQY9y98kpfQuIEbueWLYpFKQXHaPIeejQjcciQTBrwEO1J7x1UaIGgy16JPVzCQ3f6jgCRkVNhD7N6hDR+dlc1Cd1vcAR/zcVbhIz2kmd3VZc4E5NeITz1dh66IKPvpWYU4eZmCjysRggSPHkPk6mUYJdZ0KfkGiDrPPsI1Iy4nHaupfTKiwG/2rw1QIC4qZNSl3YHb7kWZsQn2Ee3erXg2FfvqmYy4qZiNUL3XTwzdyi6ktMrKe2s3x8gB7Du5DNTrhBu33sSAuEk29JSHnLQr3bQq0UcYh8CNYo8ZJyF765mlKW4pSUIGfXn7z8L5d5t7l90DVH4gIX/H9rezkOMaPyFX70/E5FmBV3Kvw1f96RQg7qZsX9BuH+VkCAL5JBdxsRM08CO9H+CD3AMugVNM35KRwraOxc6l8tM1MgJGKvsxQzhSJuB+oyXYGa7zTlNz5vdYSl+6uTadVQybcu2E7UkKimNnrAWwhs/5+fQl3HbzPei6e1kEd1q68Dln45onoeMTQ0Qaj6JsSKQEOuqEF0Y8168KHyqHx/bvcRBj41oUfKwe9QXNofoSuoqdKVnTJQbEOtyb3jt7fuIfRk/36pTYAlDm0TwMtaeTjBcXx9td7SY57PNe/4kTvwi+Cc6CTRLfUr/tV3H4OPxBSFvs090IcJT2yBpBxE+2w8q8kOBjT/ic6d94POPfGt1ri+aJygfnr5tz5+bUfrd0kXnkEOvKscX58+ODH6H366IKJi134oAHE+sh/iWswFCzPHAFto8NPNlkYlShIx2up4vvnRhqdYw6xxylis+f03noG8ZijgIcEO2gbgIKwFm05LJTP+AtI5vFcpv3ZHzkAkfovZqMe3gjB43huiQz29VT6AKIMuyDcIT0dQRg65cLRhNdZ7PKJbpZLHo/f3hdmBL1SAIHUXUOwl4HxoHRqnSNHR9/8M1FKnOTEaqOsudJ069RtkgEMnl4cKRfKU6Z37rbMU3sgxHXiZx0SCL+qwkccrXCCCn7w/+xO84oN6idQ/55xXCQBccNrP0RV0gEIawfz+xxiF9v1k1D5duTr/7b1Sqv1p9C0DT8DeNTcwDshB7EbEL9H/urTsOGjaNEDI/FNUUMNi8/XKB850jZO7KyPLt5yQOkqAHd95LSHgfnBRTKusyjbXWa4esXETomdSVccgxv6rB8vVL6tYvh/zz2+SAAsaznqLg88FDXRqMDBASsuyx6x7548+aIXdEjkRzgC7VBkiSAE9IjWIvHDIKr89cod7CtO6RSQsOQnvn+9qrqm8Qm8F5eDB0QEX0GiHMxgiWsfJejdrUuOAtb4gqTqGBcI4I9T00guKyfrmxMshuGx+EzaWU21E7BVCLiUuQUt8IHoFApGKPuQ7rTYQde+VX4nSsDli+xce3NDMTq4c/6PMVPzB1kw68ssEHPk7WAqPopHzLogXCzsrATY2vDTjC1MzL5pSpDnRJoJW3x+p7+dy3Y8mAlJOLCPXD6WFoUo5waMZCsPHLssdgqYZwTz8af109cPFG32WhKQ9xaSLu2kxK0U9TMGVZVocBQHY361O26LbQpYBQvUOrb2AFE39miJA//OvXmXv4Kz9I94c+7ujS5vPQX5v0DZg/6xHYs5lpGlxYa9NVpcHe6fW8YHsOmvPQ/zWcQnzfRsKluZSSz/BOUjW7Copsuh6y3j8TfLgghiQyZKFQdbN7JQ6kGUTb1EHka6p5scmIpMYI8f+Vf7/4D1OVHhuTZ3DYIHVwSoxjnmdD1B8rvxCda0p8S2MerxyToek0nNNwA7UTD6FR8b9SMvGvSBoS48D8L94TP0x3/w731E1bYubZV3zXTOam0/CohNOvXRW1yMSDJGlOvkwbQW8i+DZd04K4t8RorSXdjL7I0TiYbSJ8bQ0daG0AUuPh56YMGRg3srctmxl5y/tvv0cDsjTxdxP0nfUeBNBKpN2SmDnakJpvNFuSjRifETFdU8FCsTv/FDH/YAGhhfwRB72Sj4DofZj3znAOqhZ+XNtqVBxlmdp1qoemDTjCyLe8UvDmfuzUeDeVU/RkfniQ92cVITeYWwZClVNirEvFMK98u3tSaOvbxiTi+IzXQ5FlvHNtIkSXABSoMufh0sKeRnRk56sIEUsYeyfzfhHY07Q/H6+gqUpQtaJ0LFhOghbmtgUQTkYonMoaF069B5DO7Az9F5nbaEbO5WEorjKyIap2FkOH4zMJnc23JAqnD8WVRsbE3J15p4iw8cfExmBlS/NoFQfmN1IxGtrKmR+a+9qAAGB/+vvv1P83m04qy/20QLi3FXceG/tLkaCFGbjtfVfmABhSaHownVEKPm8LBAMeUXWDkTFA98fOppuAzzu0kr0tLAw389sbEYaUWkqFHITEKF4oI1wtgks4uiFCe5mQfc/4/DAjh8ysmInMYuUKPD90jQ4hr+lsYV8KARhHSwjBw+LiOb4diFxSv81vZ0TLV7Zn3iM4x4dYDOOmRHvcEm4RDVSJcKt6Z6FLGIsR2Mzp+tK+0icjsJqsCRXE0zDf2tKD5zSRMC60bAy0vVYW+4MxUYx+2hNTKH2XMqq3Joq11M4+WdEII/fm1pp0xIF3iGH2rSEy6yWOHHKgLoG8NVttSp/NYBzq+TNc2h3J6nKWSMSXGsYIX0hcsAPDtfwJejoWhvelGSxb0Z9RgFHQnr2CH072F/lYxZNt0CremWKSmk291/cYREEbxuqXti0aHDUN8BIh+d6vVTVKslh9G6flhcbRYmx87IZrqP9rU8tAJ8iYiuy84CE8HIz9FnYGnyx2fGJXBEMMPKT2myZkGtBW8TUY72xZSEXeE3TiQOxtlESewyFqgw/yUE5EM1y9pi9r6EOWf6iVh5rdKC7HX7Yx/b4tXlgnnpjY95BSf6nKXWPdgY6AqCGRQy//Sb7GnroosSkDOxvLOkZQLocUqpjpICw+MttEWX3NRggxxcbGeX2xe+SAt7QTKnK59YYwGUjHrbM89g/Dbc+l7Xw1/N3+eXkdzG+JIJdbZDrjtY1ER9VwQ2IcbSdpOtl+B2FPsYRlyQhNKJQ5GdYXLMzHV/MQKrXpzHSHfO5UuBBjDZXnlfnox48qRQlV27A7WV0MXVUz2PioDVtEb6tUe+qmfULsy6cUiVxdDKpZ20QaS4u4R5sbvUzxm/pbTHB7SBk83uQxvELINAJpL5npi03YXLtIEfUnv1dtWAbokB/5IlmBB2oMaTST9W80DRrGeYtNdnd/JELMH1PI0CGFGkN6WYhyL4NPzsYBzZv2ueTgm6+89JA9/Cg1Q0ZKXizV+sJ+8u1MAMnzNMs6kHELlxMp1ws2s09C7PoqyvozVqOaIewahZ1kj36s421YHh7let/n6eL2gQfRbb02GOG9WeBQji3JaT6Mt0HoCQrDbrSNf2ZH4Q/6i5pixZp7uDs0a1KpjVz/k8/BcTG49nM5DxZPRZfjhUxKXTozaNBRlqH4rkRB/gWsy6tmlyOiXHXP7d/242EEozuhN1KKTIQatP8DiCA/B79QZRe3Uf+HOsJim1usIywXLON00lcgB62KWymVKcn/h0rCwKJt/mjvqq5+x+KZ/tMIa7Ln6Pp+i8C2z/LvybnNcCncjfD+tKJuBUJQNuEHfOaNuVh/v4UsDvjOAAncUVKDkFMneWuEcM/MDaLCrWSTt0UozPHJ7XlCAaH784SayXYIloGpe+swKr2z6z0Roj+lV3AWldy7dn52VzUJ+HIuBtaV3PDYec+782BuTUsyBUp46PYe7iiyTepgp6z+SNUdlm8FkIhJmBT0aIWUMrgM2PKJ86MJZW5XGixYfluuu3gzJkJnT4WFokpK4Q/cB/xGEDHSLCo/VSjjIdBEPPguKB1VvKIBQoUTMqveBqED93JXhJhX3DxOXVnu7tl9b0Z4t3rFyVcVDxnrLd+Fhw7Wha8K4ankIRZ2fhOI5NQtnYJ1PKSXmgaXUKfXpagmz6MKIYWY5HOSRf2+LPHOJWlNFAGrQchcWeH2lfUNjP6m9pqFSikVpzXjF9+EA8BxfSGAGh7iZBySV56G0LOhKxjYnocyvtBO7YbH0Z6y+ki6Wh4CSBchvqKoYpf2bn1h0XsIUb6H8lD3BSGSIVzKUB/Fcxehy1xMRXrJNWMs6uAZ8pBP5E3yehoV1sENVdrCAKFoIX09O4P3JmWKjBAiSBr1X2V3I2I+eEdOUbOA1iYIsU6FCNV6PkQ1zssQNl0NwiEbImS0t3qRpV90YtWTlwraQsjVTWf3Cku/9IzuKg1eTYTSjfoKNjHo9OVETUFr81Du+iJradb6AB0s19QiCbcpQoGys0seEnneEBxKULJzG0toa4Sc2t+XaQ+hePGkZZ54O4SQfDJ9nqTC6ZLXtjBFSx6CpJ4fFZ3dAOLZbV00vAVCma0lbgnNEtf+DBwX0mlPo/pNvY1foo5xH4jHb04+aPZxyLJsgGTiUo0Cm3dti8IPGLyns/n4Kw+O3KZ9bDpoC1pHWITMhHe5CwFif7ABkBp01ZXesT9BKA2WYP0HC4cQk3Ugk200SlFoIhQ71a2VKlp36Wub7UL/AuE1bQ/ZOFuek46y1ebfel0ri6Bt34hL/S0mMVj2VF08X7Otr1mi2AJC5UDo7j9s6xy5p/jYd1vkFFeQCQ+zgrPdcSJG3iJIvv6NuzQLQX8WQpepTUH0cyS2piK0cvwRV3vp6hc7COWb5SB34/6lg1kFiDY66OIG6sdh08TpxyLMSK5U3nk9ICRLfW0ktZe9nwQ4WJ8b367XhOwgVKmUtNNN1RXYzqWMQBXSfC0NSYdz2KFMa3tWQZYQIimxCsarfnLhSj0nM3ke9VfjLI9Ab4NWSrYQCpXnSla6XhAfPuuRXX03mp8Dz6VUHZXp1LOrIGvzMPuHZd/7QTpcz/p1l8Us+7P1MA18+TiTeqvF5Wx36f65Rf1gsvyX+Q+q1GbfC6M0Hk7nX4vBcpRwkUxGy8Hiaz4dxmkUej1XfrrhW6q6VrBj1Rf/Af9wvKANVFFWAAAAAElFTkSuQmCC"
                    }
                    alt="profile photi"
                    height="100%"
                  />
                </div>
              </div>
              <div style={{ marginLeft: 10, flex: 1 }}>
                <div
                  style={{
                    color: "#385898",
                    fontWeight: 600
                  }}
                >
                  {firstName} {lastName}
                </div>
                <div style={{ fontSize: 12, color: "gray" }}>
                  {moment(details.createdAt).fromNow()}
                </div>
              </div>
              {myUID === details.createdBy && (
                <div>
                  <Dropdown
                    options={{
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      container: null,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }}
                    trigger={
                      <Button flat node="button">
                        <Icon>more_vert</Icon>
                      </Button>
                    }
                  >
                    <a href="w" style={{ color: "black" }}>
                      Edit
                    </a>
                    <a
                      href="w"
                      style={{ color: "black" }}
                      onClick={event => {
                        onPostDelete(event, details.postKey);
                      }}
                    >
                      Delete
                    </a>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
          <div>{details && details.content ? details.content : ""}</div>
        </div>
      </div>
    </div>
  );
};