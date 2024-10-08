import { faqs } from '../data/faqs.js';

const template = document.createElement('template');
template.innerHTML = `
        <style>
        :host {
          --question-color: hsl(292, 42%, 14%);
          --answer-color: hsl(292, 16%, 49%);
          --light-pink: hsl(275, 100%, 97%);
        }  
          
        *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }
        
        .item {
          
          
        }
        
        h3 {
            color: var(--question-color); 
          }

        

        .title{
          
          border-top: 2px solid var(--light-pink);
          padding: 1rem 0 1rem 0;
        }
        
        img {
            margin-left: 1rem
        }

        .content {
          display: none;
          color: var(--answer-color);
          padding-bottom: 1rem;
        }
        
        .open {
          display: block;
          margin:0;
        }

        summary {
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media only screen and (min-width: 1921px) {
            .title{
          
            padding: 2rem 0 2rem 0;
            }
            

            .content {
            
            padding-bottom: 2rem;
            }
        }


        @media (max-width: 991.98px) {
        
            h3 {
                font-size: 1rem;
            }

            p {
                font-size: .9rem;
            }

        }

        @media only screen and (max-width: 1199.98px) {
        
            svg {
                width: 2.5rem;
            }

        }


        @media only screen and (max-width: 767.98px) {

            svg {
                width: 1.5rem;
            }

        }
        
        </style>
        ${faqs
          .map(
            (faq) => `
            <div class="item">
                <details class="title" >
                  <summary><h3>${faq.question}</h3>
                  <img src="./assets/images/icon-plus.svg" alt="plus icon" />
                  </summary>
                </details>
                <div>
                <p class="content">${faq.answer}</p>
                </div>
            </div>
        `
          )
          .join('')}
`;

class Accordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.openIndex = null;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.item').forEach((item, index) => {
      const content = this.shadowRoot.querySelectorAll('.content');
      const icon = this.shadowRoot.querySelectorAll('img');
      const svgPlus = './assets/images/icon-plus.svg';
      const svgMinus = './assets/images/icon-minus.svg';
      const title = this.shadowRoot.querySelectorAll('.title');
      title[0].style.border = 'none';

      const toggleAccordion = (
        index,
        svgOpen,
        altOpen,
        svgClose,
        altClose,
        className = 'open'
      ) => {
        // Check if any accordion is currently open
        const isOpen = this.openIndex !== null;

        // Close the currently open accordion (if any)
        if (isOpen) {
          content[this.openIndex].classList.remove(className);
          icon[this.openIndex].src = svgClose;
          icon[this.openIndex].alt = altClose;
        }

        // If the clicked accordion is not the currently open one, open it
        if (this.openIndex !== index) {
          content[index].classList.add(className);
          icon[index].src = svgOpen;
          icon[index].alt = altOpen;
          this.openIndex = index;
        } else {
          // Otherwise, reset openIndex (all accordions are closed)
          this.openIndex = null;
        }
      };

      item.addEventListener('click', () => {
        toggleAccordion(index, svgMinus, 'minus icon', svgPlus, 'plus icon');
      });
      // item.addEventListener('keydown', (e) => {
      //   if (e.keyCode === 13) {
      //     toggleAccordion(index, svgMinus, 'minus icon', svgPlus, 'plus icon');
      //   }
      // });
    });
  }
}

window.customElements.define('accordion-component', Accordion);
