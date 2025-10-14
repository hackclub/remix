import Dialog from 'rc-dialog';

export default function FaqDialog({ visible, onClose }) {
  return (
    <Dialog
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      style={{ width: '95%', maxWidth: '1400px' }}
    >
      <div className="bg-pink-500 border-4 border-dashed border-gray-800 rounded-lg p-8 faq-dialog-animated">
        {/* FAQ Header */}
        <div className="mb-8">
          <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-4 faq-header-animated" style={{fontFamily: "'Bitcount Grid Double', monospace"}}>
            FAQ
          </h2>
          <div className="w-full border-b-4 border-dashed border-gray-800" style={{backgroundColor: 'rgba(128, 128, 128, 0.1)'}}></div>
        </div>

        {/* FAQ Items - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 faq-item-animated pixelated-border">
            <h3 className="text-gray-900 text-xl font-bold mb-2">What is the Remix Challenge?</h3>
            <p className="text-gray-800 text-base">The Remix Challenge is a creative coding event where you use Strudel to make music! Remix the starter beat, add your own style, and submit it win one month of Apple Music, Spotify Premium, SoundCloud Pro .</p>
          </div>

          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 faq-item-animated pixelated-border">
            <h3 className="text-gray-900 text-xl font-bold mb-2">How do I submit my remix?</h3>
            <p className="text-gray-800 text-base">Click the SHARE button in the Strudel editor to get a link to your remix, then click "Submit Remix" and paste your link in the form.</p>
          </div>

          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 faq-item-animated pixelated-border">
            <h3 className="text-gray-900 text-xl font-bold mb-2">What can I win?</h3>
            <p className="text-gray-800 text-base">All participants who submit quality work receive one month of <strong>Apple Music</strong>, <strong>Spotify Premium</strong>, or <strong>SoundCloud Pro</strong>!</p>
          </div>

          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 faq-item-animated pixelated-border">
            <h3 className="text-gray-900 text-xl font-bold mb-2">I'm stuck! Where can I get help?</h3>
            <p className="text-gray-800 text-base">Click the "Need Help?" button to join our Slack community where friendly members and mentors are ready to help you out!</p>
          </div>

          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 faq-item-animated pixelated-border">
            <h3 className="text-gray-900 text-xl font-bold mb-2">Do I need coding experience?</h3>
            <p className="text-gray-800 text-base">No! The Strudel editor is beginner-friendly. Just change the numbers and text in the code to create different sounds. Experiment and have fun!</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}