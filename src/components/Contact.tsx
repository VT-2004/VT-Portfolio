
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ContactProps {
  theme: 'theme1' | 'theme2';
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, this would send the form data to a server
      // For now, we'll simulate sending an email
      console.log('Form submitted with data:', data);
      console.log('Email will be sent to: vikastalawar14@gmail.com');
      
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setShowSuccess(true);
      form.reset();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className={`text-4xl font-bold mb-12 text-center ${
          theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
        }`}>
          Get In Touch
        </h2>
        
        <div className={`rounded-2xl p-8 backdrop-blur-sm relative ${
          theme === 'theme1' 
            ? 'bg-theme1-primary/10 border border-theme1-accent/30' 
            : 'bg-theme2-primary/10 border border-theme2-accent/30'
        }`}>
          {/* Success message */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl z-10">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className={`rounded-full p-4 ${
                  theme === 'theme1' ? 'bg-green-500/20' : 'bg-green-500/20'
                }`}>
                  <ThumbsUp className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
              </div>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-5 ${theme === 'theme1' ? 'bg-[#ea384c]' : 'bg-[#F97316]'}`}></div>
                        <FormLabel className={`block text-sm font-medium ${
                          theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                        }`}>
                          Name <span className="text-xs ml-1 opacity-75">(required)</span>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className={`bg-white/10 border ${
                            theme === 'theme1' ? 'border-theme1-accent/30' : 'border-theme2-accent/30'
                          } text-white`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="hidden" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-5 ${theme === 'theme1' ? 'bg-[#ea384c]' : 'bg-[#F97316]'}`}></div>
                        <FormLabel className={`block text-sm font-medium ${
                          theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                        }`}>
                          Email <span className="text-xs ml-1 opacity-75">(required)</span>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className={`bg-white/10 border ${
                            theme === 'theme1' ? 'border-theme1-accent/30' : 'border-theme2-accent/30'
                          } text-white`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="hidden" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-5 ${theme === 'theme1' ? 'bg-[#ea384c]' : 'bg-[#F97316]'}`}></div>
                      <FormLabel className={`block text-sm font-medium ${
                        theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                      }`}>
                        Subject <span className="text-xs ml-1 opacity-75">(required)</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="Subject of your message" 
                        className={`bg-white/10 border ${
                          theme === 'theme1' ? 'border-theme1-accent/30' : 'border-theme2-accent/30'
                        } text-white`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="hidden" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-5 ${theme === 'theme1' ? 'bg-[#ea384c]' : 'bg-[#F97316]'}`}></div>
                      <FormLabel className={`block text-sm font-medium ${
                        theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                      }`}>
                        Message <span className="text-xs ml-1 opacity-75">(required)</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message" 
                        rows={6} 
                        className={`bg-white/10 border ${
                          theme === 'theme1' ? 'border-theme1-accent/30' : 'border-theme2-accent/30'
                        } text-white resize-none`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="hidden" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full rounded-full ${
                  theme === 'theme1' 
                    ? 'bg-theme1-primary hover:bg-theme1-accent text-white' 
                    : 'bg-theme2-primary hover:bg-theme2-accent text-white'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
