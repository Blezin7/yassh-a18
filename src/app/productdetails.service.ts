import { Injectable } from '@angular/core';
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  productitems: Product[] =[
    {
      id:1,
      name:'Bone Health',
      img:'assets/images/bonehealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:'Bone health depends on adequate calcium, vitamin D, regular weight-bearing exercise.',
      details:'Bone health is essential for overall mobility and strength, relying on a balanced diet rich in calcium and vitamin D to support bone density. Regular weight-bearing exercises, like walking or strength training, help maintain and improve bone strength.',
      explanation:"Bone health refers to the strength, density, and overall condition of bones, which are essential for supporting the body, protecting internal organs, and facilitating movement. Strong, healthy bones are critical throughout life to prevent fractures, maintain mobility, and ensure overall physical well-being.  Bone density is a key measure of bone health, indicating the amount of mineral matter per square centimeter of bone. High bone density reduces the risk of fractures, especially in weight-bearing bones like the hips and spine. It naturally peaks in early adulthood and can decline with age, particularly in women after menopause.  Nutrition plays a vital role in maintaining bone health. Calcium is the primary building block of bones, while vitamin D helps the body absorb calcium effectively. Foods like dairy, leafy greens, nuts, and fortified products, along with moderate sun exposure, can support bone nutrition.",
    },
    {
      id:2,
      name:"Women's Health",
      img:'assets/images/womenhealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:"Women's health focuses on reproductive health, hormonal balance.",
      details:"Women's health encompasses physical, mental, and reproductive well-being, addressing unique needs such as menstrual health, pregnancy, and menopause. ",
      explanation:"Women's health focuses on the physical, emotional, and reproductive well-being of women throughout their lives. It includes care for unique biological processes like menstruation, pregnancy, childbirth, and menopause, as well as preventive measures to address conditions such as osteoporosis, breast cancer, and cardiovascular diseases. Reproductive health is a cornerstone of women's health, encompassing fertility, family planning, and management of conditions like polycystic ovary syndrome (PCOS) and endometriosis. Hormonal changes throughout life, from puberty to menopause, significantly impact physical and mental health, requiring tailored care and support.  ."
    },
    {
      id:3,
      name:"Men's Health",
      img:'assets/images/menhealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:"Men's health focuses on maintaining physical fitness, mental well-being.",
      details:"Men's health emphasizes regular physical activity, proper nutrition, and mental wellness to prevent chronic conditions like heart disease, diabetes, and prostate problems.",
      explanation:"Men's health focuses on maintaining physical well-being through regular exercise, balanced nutrition, and healthy habits. Men are at risk for conditions like heart disease, diabetes, and obesity, which can be mitigated through a healthy lifestyle, including weight management, cardiovascular exercises, and proper nutrition.Men's reproductive health includes managing testosterone levels, sexual function, and fertility. Low testosterone can lead to symptoms like fatigue, depression, and muscle loss. Regular check-ups are important to monitor and manage conditions like erectile dysfunction and prostate health.Mental health is equally crucial for men, as they are often less likely to seek help for stress, anxiety, or depression."
    },
    {
      id:4,
      name:'Nerve Health',
      img:'assets/images/nervehealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:"Nerve health is crucial for proper brain function, muscle control.",
      details:'Nerve health is essential for transmitting signals between the brain and the body, affecting movement, sensation, and cognitive function.',
      explanation:'Nerve health is critical for communication between the brain, spinal cord, and the rest of the body, controlling everything from movement to sensation. Healthy nerves ensure that signals are sent and received properly, allowing the body to function smoothly. Nerve damage can lead to conditions such as neuropathy, muscle weakness, or cognitive impairments.Several factors influence nerve health, including diet, exercise, and lifestyle choices. Nutrients like vitamins B12, B6, and antioxidants support nerve repair and function. Poor lifestyle choices like smoking, excessive alcohol consumption, and high-stress levels can damage nerves and hinder their ability to function properly.'
    },
    {
      id:5,
      name:'GI Health',
      img:'assets/images/gihealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:'GI health is vital for digestion, nutrient absorption.',
      details:'GI health is crucial for proper digestion, nutrient absorption, and waste elimination, with a healthy gut microbiome playing a key role.',
      explanation:' Gastrointestinal (GI) health refers to the proper functioning of the digestive system, which includes the stomach, intestines, and related organs. A healthy GI system ensures the effective breakdown of food, absorption of nutrients, and removal of waste. Problems like indigestion, bloating, or chronic conditions like IBS can affect overall health and well-being.Diet plays a significant role in GI health, with a high-fiber, nutrient-rich diet promoting smooth digestion. Consuming probiotics, prebiotics, and staying hydrated can help maintain a healthy gut microbiome, which supports digestion and immune function. Avoiding excessive processed foods, alcohol, and stress also helps protect the GI system.Regular physical activity aids digestion and prevents issues like constipation. Managing stress, avoiding smoking, and having routine check-ups for conditions like acid reflux or GI disorders are essential for maintaining a healthy digestive system. '
    },
    {
      id:6,
      name:'Renal Health',
      img:'assets/images/renalhealth.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:'Renal health is essential for filtering waste, balancing fluids.',
      details:"Renal health is crucial for maintaining the body's fluid balance, filtering waste, and regulating electrolytes and blood pressure.",
      explanation:" Renal health refers to the proper function of the kidneys, which filter waste and excess fluid from the blood, regulate electrolytes, and help control blood pressure. Healthy kidneys are essential for overall body function, preventing the build-up of harmful substances and maintaining a balance of fluids and nutrients.Various factors can impact kidney function, including dehydration, high blood pressure, diabetes, and a poor diet high in salt and processed foods. Chronic kidney disease (CKD) can result from prolonged damage, leading to the kidneys' inability to effectively filter blood. Early detection and lifestyle changes are critical for preventing further damage.To maintain kidney health, it's important to stay hydrated, eat a balanced diet low in sodium and processed foods, and exercise regularly. "
    },
    {
      id:7,
      name:'Immunomodulator',
      img:'assets/images/immunomodulators.png',
      relimg1:'assets/images/bioten2.jpg',
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:"Immunomodulators help regulate or modify the immune system's response.",
      details:"Immunomodulators are substances that modify the immune system’s activity, either enhancing or suppressing immune responses. ",
      explanation:"Immunomodulators are substances that alter the activity of the immune system to either boost or suppress its response. They are used in a variety of medical conditions where the immune system needs to be regulated, such as autoimmune diseases, chronic inflammation, or organ transplantation.There are two main types of immunomodulators: immunosuppressants, which dampen immune responses to prevent the body from attacking itself or rejecting a transplant, and immunostimulants, which boost immune activity to fight infections or cancer. Medications like corticosteroids, biologics, and certain disease-modifying anti-rheumatic drugs (DMARDs) are common examples.Immunomodulators are crucial in managing conditions like rheumatoid arthritis, lupus, and multiple sclerosis, as well as preventing organ transplant rejection. "
    },
    {
      id:8,
      name:'Sleepcare',
      img:'assets/images/sleepcare.png',
      relimg1:'assets/images/bioten2.jpg', 
      protxt1:'Bioten',
      relimg2:'assets/images/c-vid.jpg',
      protxt2:'c-vit',
      relimg3:'assets/images/cartimax.jpg',
      protxt3:'Cartimax',
      heading:'Sleep care involves practices and habits that promote restful, restorative sleep.',
      details:"Sleep care includes maintaining a consistent sleep schedule, creating a comfortable sleep environment, and managing stress for restful sleep.",
      explanation:" Sleepcare focuses on improving sleep quality and duration, which are essential for physical health, cognitive function, and emotional well-being. Adequate sleep helps with memory consolidation, immune function, and the body's ability to repair and rejuvenate. Poor sleep can lead to various health issues, including fatigue, weakened immunity, and increased stress levels. Effective sleepcare involves establishing a consistent sleep routine, creating a peaceful and dark sleep environment, and managing sleep-disrupting habits. Limiting screen time before bed, avoiding caffeine, and engaging in relaxation techniques like meditation can help signal the body to wind down and prepare for restful sleep."
    }
  ]

  constructor() { }
}
