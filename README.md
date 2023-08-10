# BidSquad - Carbon Credit Auction Platform

<center>
  <img src="/docs/images/logo.png" style="width: 25%;">
</center>

BidSquad is a groundbreaking carbon credit auction platform that harnesses the power of blockchain technology and artificial intelligence to conduct reverse auctions for carbon credit certification. The platform is designed to connect individuals who own and preserve green areas within their land with certifiers specialized in carbon credit assessments. Utilizing a reverse auction mechanism, BidSquad empowers landowners to efficiently find certifiers offering competitive prices for certifying the carbon credit emissions of their preserved areas.

---

## Scenario

In the context of environmental preservation and the urgent need to combat climate change, BidSquad emerges as a revolutionary carbon credit auction platform with a distinctive purpose. This platform harnesses the power of blockchain technology and artificial intelligence to conduct reverse auctions for carbon credit certification. Let's delve into the key components of this innovative scenario:

1. **Empowering Environmental Stewards**: BidSquad's primary focus is on empowering individuals and entities who own and preserve green areas within their land. These environmental stewards play a crucial role in conserving natural spaces that contribute to reducing carbon emissions.

2. **Reverse Auctions for Certification**: BidSquad introduces a transformative approach to carbon credit transactions through reverse auctions. Landowners initiate these auctions to connect with certifiers who specialize in carbon credit assessments. In this setup, the certifiers bid to offer their certification services, thereby creating a competitive environment that benefits both parties.

3. **Connecting Landowners and Certifiers**: BidSquad serves as the bridge that connects landowners with certifiers. Landowners can efficiently discover and engage with certifiers who offer competitive prices for certifying the carbon credit emissions associated with their preserved areas.

4. **Efficiency and Transparency**: Through the reverse auction mechanism, BidSquad ensures a fair and transparent process. Landowners can set a maximum budget for carbon credit certification, while certifiers compete by submitting reverse bids. This setup optimizes cost-efficiency and encourages healthy competition among certifiers.

5. **Positive Environmental Impact**: By streamlining the certification process for carbon credit emissions, BidSquad contributes significantly to environmental preservation. The platform enables more landowners to participate in carbon credit trading, thereby promoting a collective effort to combat climate change.

6. **AI-Powered Image Recognition**: BidSquad incorporates cutting-edge AI-powered image recognition technology. Landowners provide geographic coordinates of their preserved areas, and the platform analyzes satellite images to determine the extent of the green area. This analysis plays a crucial role in calculating associated carbon credit tokens.

7. **Blockchain for Trust and Security**: BidSquad's foundation lies in blockchain technology, ensuring the security, transparency, and immutability of transactions. Every step of the auction process, from bids to payments, is recorded on the blockchain, cultivating trust among participants.

8. **Global Reach and Impact**: As a global platform, BidSquad enables participants from diverse regions to engage in carbon credit trading. This inclusivity amplifies its impact by involving stakeholders from various industries and backgrounds.

9. **Addressing Challenges**: While BidSquad's approach is innovative, challenges such as market education, regulatory compliance, and scalability may arise. The platform's success hinges on effectively addressing these challenges and continuously refining its technology and processes.

In the dynamic landscape of environmental preservation and climate action, BidSquad emerges as a transformative platform that harnesses blockchain and AI technologies to foster a thriving marketplace for carbon credits. By providing a robust and transparent system for carbon credit auctions, BidSquad empowers individuals and organizations to actively contribute to a more sustainable future.

---

## Problem Definition

The fight against climate change and the pursuit of a more sustainable world are marked by a complex web of interconnected challenges. In the current landscape, the management and trade of carbon credits, critical for incentivizing reductions in greenhouse gas emissions, grapple with substantial obstacles. Some of the key difficulties and issues in existing solutions include:

1. **Lack of Transparency and Trust:** Traditional systems for carbon credit trading often suffer from opacity and a lack of credibility. Without a transparent mechanism to trace the lineage and authenticity of credits, the potential for fraud looms large. This uncertainty undermines the confidence in emissions reduction efforts and raises questions about the actual impact achieved.

2. **Complexity and Entry Barriers:** The intricate processes involved in obtaining and certifying carbon credits can be daunting, particularly for small businesses and projects. The intricate validation and verification procedures create formidable barriers to participation, limiting the accessibility of emissions reduction strategies.

3. **Lack of Standardization:** The absence of standardized practices across global carbon trading systems introduces compatibility challenges between different markets. This disparity makes it challenging for stakeholders to assess the true value of credits and complicates the integration of effective solutions on a global scale.

4. **Risk of Fraud and Accounting Errors:** Inaccuracies in accounting and tax verification procedures can lead to the erroneous issuance of carbon credits. Additionally, the potential for credit forgery poses a tangible threat, eroding trust in the overall system.

5. **Insufficient Incentives:** Some carbon trading systems fail to offer compelling financial incentives for organizations to commit to emissions reduction. Without potent motivation, the adoption of carbon reduction initiatives might remain lackluster.

6. **Limited Access:** Emissions reduction projects often struggle to gain effective access to carbon markets. This challenge is exacerbated by the absence of efficient distribution channels and platforms capable of seamlessly connecting carbon credit buyers and sellers.

7. **Lack of Public Engagement:** Prevailing solutions often fall short in actively engaging the wider public. The success of long-term emissions reduction heavily relies on fostering public awareness and meaningful involvement.

BidSquad strides forth to confront these pressing challenges by introducing an inventive carbon credit auction platform. Powered by cutting-edge technologies like blockchain and artificial intelligence, BidSquad aspires to establish a realm of carbon credit trading that is transparent, efficient, and trustworthy. The platform takes aim at the pervasive issues inherent in traditional carbon trading models, aiming to nurture a more vibrant and effective marketplace that drives environmental sustainability forward.

---

## Solution

The **BidSquad** platform emerged from the need to streamline the connection between environmental conservators, such as farmers, and carbon credit certifying entities. To achieve this, **BidSquad** offers key features that redefine the process of carbon credit certification and trading. Below are the core components of the solution provided by the platform:

### Auction Creation

For individuals and entities engaged in preserving green areas, **BidSquad** offers an innovative way to initiate carbon credit auctions. These auctions serve as a means to connect environmental advocates with carbon credit certifiers. Participants can create auctions, specifying the details of the preserved green area and auction conditions, such as duration and end date. Certifiers, in turn, can competitively bid, indicating the value they are willing to offer for their certification services. **BidSquad** promotes healthy competition, ensuring that the certifier with the lowest bid emerges as the winner.

### Area Definition and Image Recognition

A key innovation of **BidSquad** is its integration with image recognition and geolocation technology. Farmers and advocates of green areas can input the geographic coordinates of their preserved areas into the platform. Utilizing the Google Maps API, the system automatically retrieves a satellite image of the region, converting it into base64 format, which is then forwarded to Cartesi's infrastructure through the input contract. Internally, the platform employs artificial intelligence for image recognition, analyzing the satellite image to determine the extent of the green area. This analysis is crucial for calculating the number of carbon credit tokens that might be generated for that area.

### Payment Process

**BidSquad** ensures that the payment and financing process for carbon credit auctions is transparent and efficient. Participants, upon providing coordinates and relevant details, also indicate the amount they are willing to pay for certification services. This amount is deposited in ethers into the EtherPortal contract, ensuring that funds are securely held and accessible throughout the auction process. Certifiers, identified by their wallets, participate in the auction by bidding according to the terms set by the auction creator. Once the auction concludes, the auction creator has the option to finalize it, initiating the next phase.

### Finalization and Value Distribution

Concluding an auction marks the final phase in the **BidSquad** process. At this point, the system generates vouchers that facilitate the transfer of agreed-upon values between the auction creator and the winning certifier. This transfer is conducted securely and automatically, ensuring that the certifier receives payment for their rendered services. Additionally, any remaining funds that were not allocated to the winning certifier are returned to the auction creator, maintaining transparency and fairness for all involved parties.

By integrating these innovative elements, **BidSquad** creates a comprehensive and effective solution for connecting environmental conservators with carbon credit certifiers. The platform simplifies complex processes, streamlines transactions, and fosters mutual trust among participants. With blockchain technology and artificial intelligence as foundational pillars, **BidSquad** is paving the way for a more dynamic, transparent, and accessible carbon credit market, thus contributing to a more sustainable and environmentally conscious future.

---

## Personas

### Persona 1: Landowner - João

<div style="display: flex;">
<img src="./docs/images/joao.jpeg" alt="Joao Silva" width="260" height="260" style='border-radius: 50%;' />

-   **Name:** João Silva
-   **Age:** 45 years
-   **Profession:** Farmer and landowner
-   **Location:** Goiás, Brazil
-   João owns a farm where he practices agriculture and livestock farming. He has always had an interest in cryptocurrencies and blockchain technology, which sparked his curiosity about the potential applications in the carbon credit industry. Despite his interest in innovative technologies, João faces challenges in navigating the complex world of carbon credit certification. He is concerned about the transparency and credibility of carbon credit projects, as well as the documentation and verification processes involved. João is looking for a reliable and streamlined solution that can simplify his engagement with carbon credits and help him contribute to environmental preservation more effectively.
</div>

### Persona 2: Certification Representative - Maria

<div style="display: flex;">
<img src="./docs/images/maria.jpeg" alt="Maria" width="260" height="260" style='border-radius: 50%;' />

-   **Name:** Maria Oliveira
-   **Age:** 35 years
-   **Profession:** Carbon Certification Manager at Gold Standard
-   **Location:** São Paulo, Brazil
-   Maria is an experienced professional in the environmental certification field, focusing on carbon emission reduction projects. She works at Gold Standard, one of the leading carbon credit certifying organizations in Brazil. Maria's role involves evaluating and certifying carbon credit projects, ensuring their compliance with rigorous standards. She faces challenges related to verifying the accuracy and authenticity of project data, as well as ensuring transparency in the certification process. Maria is looking for innovative solutions that can enhance the efficiency and reliability of carbon credit certification, streamlining the verification process while maintaining the integrity of the certification standards.
</div>

---

## Architecture

<center>
  <img src='./docs/images/architecture.jpeg' alt='Architecture' style='width: 80%;' />
</center>

### Architecture Overview

#### User (Certificator/Landowner)

-   Interacts with the system as Certificator or Landowner

#### Frontend

-   Serves as the user interface
-   Allows users to:
    -   View all auctions
    -   Get bids from an auction
    -   Make bids in an auction
    -   End auctions (if creator)
    -   Create auctions

#### Cartesi Machine (Smart Contract)

-   Handles auction-related actions:
    -   Auction creation
    -   Bid submission
    -   Auction ending
    -   Auction retrieval
    -   Bid retrieval
-   Communicates with AI module for auction creation

#### AI Module

-   Analyzes auction information, including area coordinates
-   Provides insights for auction creation
-   Enhances the creation process within Cartesi Machine

#### Blockchain

-   Records all transactions and actions
-   Ensures security, tamper-proofing, and transparency

#### Frontend Updates

-   Receives updated auction and bid data
-   Keeps users informed with the latest information

#### User Feedback

-   Presents outcomes and feedback through the frontend

---

## Technology Stack

### Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   Ethers

### Cartesi

-   Cartesi Machine

-   ### AI

    -   Jupyter Notebook
    -   Python
    -   Scikit-learn

---

## Folder Structure

### Frontend

-   `frontend`
    -   `src`
        -   `app` (main app component & pages)
            -   `auctions` (auctions page)
        -   `components` (reusable components)
        -   `contexts` (global contexts)
        -   `assets` (images, icons, etc.)
        -   `utils` (utility functions)

### Cartesi

-   `cartesi`
    -   `bidsquad` (Cartesi Machine)
        -   `core` (core logic)
        -   `deployment` (deployment scripts)

### AI

-   `AI`
    -   `ai.ipynb` (AI model)
    -   `imgs` (images used in the AI model)

---

## Installation

### Frontend

1. Enter the `frontend` folder:

```bash
cd frontend
```

2. Install the dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

### Cartesi

1. Enter the `cartesi/bidsquad` folder:

```bash
cd cartesi/bidsquad/
```

2. Start the virtual environment and install the dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Start the Cartesi Machine:

```bash
docker compose -f ../docker-compose.yml -f docker-compose.override.yml -f ../docker-compose-host.yml up
```

4. Run the bidsquad dapp

```bash
ls *.py ./core/*.py | ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004/" NETWORK='localhost' entr -r python3 bidsquad.py
```

---

## Usage

Check out the [demo video](/_ Link do video _/) for a walkthrough of the platform.

Link for the project: [https://bidsquad.vercel.app/](https://bidsquad.vercel.app/)

---

## Our team

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/henriquelfmatias/">
        <img src="https://github.com/Lemos1347.png" width="100px;" alt="profile image"/><br>
        <sub>
          <b>Henrique L. Matias</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/lyorreisquintao/">
        <img src="https://github.com/lyorrei.png" width="100px;" alt="profile image"/><br>
        <sub>
          <b>Lyorrei S. Quintão</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/marcelofeitoza7/">
        <img src="https://avatars.githubusercontent.com/u/71825192?v=4" width="100px;" alt="Marcelo Gomes Feitoza"/><br>
        <sub>
          <b>Marcelo G. Feitoza</b>
        </sub>
      </a>
    </td>
    <td align="center"> 
      <a href="https://www.linkedin.com/in/paulo-evangelista/">
        <img src="https://github.com/paulo-evangelista.png" width="100px;" alt="profile image"/><br>
        <sub>
          <b>Paulo P. Evangelista</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/pedro-hagge/">
        <img src="https://avatars.githubusercontent.com/u/99206621?v=4" width="100px;" alt="Pedro Hagge Baptista"/><br>
        <sub>
          <b>Pedro H. Baptista</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
