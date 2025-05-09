
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import MainSidebar from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { getAllTemplates } from '@/service/User/signatureService'




const CreateSignaturePage = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");


  const [allTemplatesList, setAllTemplatesList] = useState([])

  const { toast } = useToast();
  const navigate = useNavigate();


  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarCollapseChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  useEffect(() => {
    getTemplates()
  }, [])

  const getTemplates = async () => {
    const req = {}

    await getAllTemplates(req)
      .then((res) => {
        if (res.status) {
          setAllTemplatesList(res.data)
        }
        else {
          setAllTemplatesList([])
        }
      })
      .catch((error) => {
        console.log("error in fetching templates", error)
      })
  }



  const nextStep = () => {
    if (step === 1 && !name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your signature",
        variant: "destructive",
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleCreateSignature = (id: number | string, htmlCode: string) => {
    let selectedTemplate = {
      id: id,
      html: htmlCode
    }

    toast({
      title: "Success!",
      description: `Signature "${name}" created successfully!`,
    });
    navigate("/user/editor", { state: { signatureName: name, templatesId: selectedTemplate, type: "add" } });
  };

  const handleSkip = () => {
    if (name.trim()) {
      toast({
        title: "Success!",
        description: `Signature "${name}" created with default template!`,
      });
      navigate("/user/editor");
    } else {
      toast({
        title: "Name required",
        description: "Please enter a name for your signature",
        variant: "destructive",
      });
    }
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };


  const html = [
    `
<body class="bg-gray-100 font-sans m-0 p-0">

  <div class="max-w-3xl mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
    <div class="flex flex-wrap gap-5 p-5">
      
     <div class="flex-1 min-w-[250px]">
        <h3 class="text-gray-500 text-base font-medium mb-2">React Developer</h3>
        <h1 class="text-2xl font-black text-black mb-2">Surya Prakash</h1>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Phone:</span><a class="text-blue-600" href="tel:+1680773560">1234567891</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Email:</span><a class="text-blue-600" href="mailto:cppatel638812@gmail.com">cppatel638812@gmail.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Website:</span><a class="text-blue-600" href="https://www.facebook.com/">facebook.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Company:</span><a class="text-blue-600" href="https://acmee.com">NXG</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Address:</span><a class="text-blue-600" href="#">Vijay Nagar, Indore India</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">NMLS:</span><span>61131131</span></p>
      </div>

      <div class="text-center">
        <img class="w-30 h-28 rounded-full border-4 border-blue-300 object-cover" src="https://loanofficersupport.s3.amazonaws.com/pimgs/18140800618image_6809d9cce7e92.png" alt="Surya" />
      </div>

      <div class="flex flex-col items-center gap-2 p-2 border-l border-gray-200 rounded-br-[18px] rounded-tl-[24.45px]">
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-facebook.png" alt="Facebook"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-twitter.png" alt="Twitter"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-skype.png" alt="Skype"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-whatsapp.png" alt="Whatsapp"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-linkedin.png" alt="Linkedin"></a>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 p-4 bg-white">
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-violet-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/call-phone.png" alt="Call" class="h-5" />
        Contact Us
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-cyan-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Zoom" class="h-5" />
        Join Zoom
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-orange-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Website" class="h-5" />
        Visit Website
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
    </div>
  </div>

</body>`,
    `<body class="bg-gray-100 font-sans m-0 p-0">

  <div class="max-w-3xl mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
    <div class="flex flex-wrap gap-5 p-5">
      
      <div class="flex-1 min-w-[200px]">

        <h3 class="text-gray-500 text-base font-medium mb-2">React Developer</h3>
        <h1 class="text-2xl font-black text-black mb-2">Surya Prakash</h1>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Phone:</span><a class="text-blue-600" href="tel:+1680773560">1234567891</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Email:</span><a class="text-blue-600" href="mailto:cppatel638812@gmail.com">cppatel638812@gmail.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Website:</span><a class="text-blue-600" href="https://www.facebook.com/">facebook.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Company:</span><a class="text-blue-600" href="https://acmee.com">NXG</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Address:</span><a class="text-blue-600" href="#">Vijay Nagar, Indore India</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">NMLS:</span><span>61131131</span></p>
      </div>

      <div class="text-center">
        <img class="w-30 h-28 rounded-full border-4 border-blue-300 object-cover" src="https://loanofficersupport.s3.amazonaws.com/pimgs/18140800618image_6809d9cce7e92.png" alt="Surya" />
      </div>

      <div class="flex flex-col items-center gap-2 p-2 border-l border-gray-200 rounded-br-[18px] rounded-tl-[24.45px]">
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-facebook.png" alt="Facebook"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-twitter.png" alt="Twitter"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-skype.png" alt="Skype"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-whatsapp.png" alt="Whatsapp"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-linkedin.png" alt="Linkedin"></a>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 p-4 bg-white">
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-violet-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/call-phone.png" alt="Call" class="h-5" />
        Contact Us
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-cyan-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Zoom" class="h-5" />
        Join Zoom
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-orange-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Website" class="h-5" />
        Visit Website
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
    </div>
  </div>

</body>`,
    `
<body class="bg-gray-100 font-sans m-0 p-0">

  <div class="max-w-3xl mx-auto my-5 bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
    <div class="flex flex-wrap gap-5 p-5">
      
      <div class="flex-1 min-w-[150px]">

        <h3 class="text-gray-500 text-base font-medium mb-2">React Developer</h3>
        <h1 class="text-2xl font-black text-black mb-2">Surya Prakash</h1>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Phone:</span><a class="text-blue-600" href="tel:+1680773560">1234567891</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Email:</span><a class="text-blue-600" href="mailto:cppatel638812@gmail.com">cppatel638812@gmail.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Website:</span><a class="text-blue-600" href="https://www.facebook.com/">facebook.com</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Company:</span><a class="text-blue-600" href="https://acmee.com">NXG</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">Address:</span><a class="text-blue-600" href="#">Vijay Nagar, Indore India</a></p>
        <p class="text-sm text-gray-500"><span class="inline-block min-w-[60px]">NMLS:</span><span>61131131</span></p>
      </div>

      <div class="text-center">
        <img class="w-30 h-28 rounded-full border-4 border-blue-300 object-cover" src="https://loanofficersupport.s3.amazonaws.com/pimgs/18140800618image_6809d9cce7e92.png" alt="Surya" />
      </div>

      <div class="flex flex-col items-center gap-2 p-2 border-l border-gray-200 rounded-br-[18px] rounded-tl-[24.45px]">
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-facebook.png" alt="Facebook"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-twitter.png" alt="Twitter"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-skype.png" alt="Skype"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-whatsapp.png" alt="Whatsapp"></a>
        <a href="https://www.facebook.com/"><img class="w-5 m-1" src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/ic-linkedin.png" alt="Linkedin"></a>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 p-4 bg-white">
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-violet-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/call-phone.png" alt="Call" class="h-5" />
        Contact Us
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-cyan-500">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Zoom" class="h-5" />
        Join Zoom
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-orange-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/star.png" alt="Website" class="h-5" />
        Visit Website
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
      <a href="#" class="inline-flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded-lg bg-purple-400">
        <img src="https://los-static.s3.us-east-1.amazonaws.com/tv/s-icon/date.png" alt="Meeting" class="h-5" />
        Book Meeting
      </a>
    </div>
  </div>

</body>
`
  ]
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex w-full min-h-screen bg-[#001430] font-sans">
        <MainSidebar
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          onCollapseChange={handleSidebarCollapseChange}
        />

        <div
          className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
          style={{
            width: "100%",
            marginLeft: isMobile ? 0 : sidebarCollapsed ? '70px' : '250px',
            paddingBottom: isMobile ? '80px' : '0'
          }}
        >
          <Header
            onMenuClick={handleMenuClick}

          />

          <div className="flex flex-col p-4 sm:p-6 pb-20">
            <div className=" items-center mb-6 gap-4">
              {step > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  className="mr-2 text-white border mb-3"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back
                </Button>
              )}

              {step == 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/user/signatures')}
                  className="mr-2 text-white border mb-3"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back
                </Button>
              )}

              <h1 className="text-white text-xl font-semibold">Create New Signature</h1>

            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className={`h-1 w-16 rounded-full ${step === 1 ? 'bg-[#01C8A9]' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-16 rounded-full ${step === 2 ? 'bg-[#01C8A9]' : 'bg-gray-600'}`}></div>
            </div>



            {step === 1 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-md mx-auto w-full"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <h2 className="text-xl text-white font-medium mb-6 text-center">Name Your Signature</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signature-name" className="text-white">Enter a name for your signature</Label>
                      <Input
                        id="signature-name"
                        placeholder="e.g. Work Signature, Personal Signature"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#031123] border-[#112F59] text-white mt-1"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center mt-8">
                  <Button
                    onClick={nextStep}
                    className="bg-[#01C8A9] hover:bg-[#01a78f] text-white px-8"
                  >
                    Continue <ArrowRight size={16} className="ml-1" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <h2 className="text-xl text-white font-medium mb-6 text-center">Choose a Template</h2>


                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
                    {allTemplatesList.map((items, index) => (
                      <div
                        key={index}
                        className="overflow-hidden bg-[#031123] border border-transparent rounded-lg cursor-pointer transition-all hover:border-[#01C8A9]/100 "
                        onClick={() => handleCreateSignature(items._id, items.htmlCode)}
                      >
                        <div className="w-full overflow-x-auto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: items.htmlCode.replace(/width:\s*650px/gi, 'width:100%; max-width:100%;'),
                            }}
                          />
                        </div>
                      </div>
                    ))}


                  </div>
{/* 
                  <div className="w-full flex flex-wrap justify-center gap-4">
                    {html.map((item, index) => (
                      <div
                        key={index}
                        className="w-full sm:w-[48%] lg:w-[32%] xl:w-[32.5%]"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </div> */}


                </motion.div>



                {/* <motion.div variants={itemVariants} className="flex justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    className="border-[#112F59] text-dark hover:bg-[#112F59]/50 hover:text-white px-6"
                  >
                    Skip
                  </Button>
                  <Button
                    // onClick={handleCreateSignature}
                    className="bg-[#01C8A9] hover:bg-[#01a78f] text-white px-6"
                  >
                    Create
                  </Button>
                </motion.div> */}
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        {isMobile && <MobileNavbar />}
      </div>
    </SidebarProvider>
  );
};

export default CreateSignaturePage;
